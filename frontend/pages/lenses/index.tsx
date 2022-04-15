import { GetStaticProps } from "next";

import Products from "../../components/Products";
import { getAllLenses } from "../../lib/strapi/lenses";

export default function Lenses({ lenses, imageUrl }) {
  const description = `This list includes all lenses made for the Fujifilm X-mount and G-mount systems including lenses from third-party manufacturers.`;
  return (
    <Products
      products={lenses}
      category="lenses"
      description={description}
      imageBaseUrl={`${imageUrl}/t_rotate_lens_270deg/FXDB`}
      imageSizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, 50vw"
      imageStyle="scale-90 hover:scale-[.95]"
    />
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const lenses = await getAllLenses();
  const imageUrl = process.env.CLOUDINARY_BASE_URL;

  return {
    props: {
      lenses: lenses.data,
      imageUrl,
    },
    revalidate: 10,
  };
};
