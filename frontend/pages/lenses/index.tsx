import { GetStaticProps } from "next";

import Meta from "../../components/Meta";
import ProductCard from "../../components/ProductCard";

export default function Lenses({ lenses, imageUrl }) {
  return (
    <>
      <Meta title="Lenses" />
      <div className="py-8">
        <div className="flex flex-col space-y-8">
          <section className="mx-auto mb-4 flex max-w-lg flex-col items-center space-y-4 text-center">
            <h1 className="text-4xl font-medium underline underline-offset-8">
              Lenses
            </h1>
            <p className="">{`Total of ${lenses.length} lenses found.`}</p>
          </section>
          <section>
            <div className="grid grid-cols-2 gap-x-3.5 gap-y-6 md:grid-cols-4 md:gap-x-4 lg:grid-cols-5">
              {lenses &&
                lenses.map((lens, i) => (
                  <ProductCard
                    product={lens.attributes}
                    path="lenses"
                    imageBaseUrl={`${imageUrl}/t_rotate_lens_270deg/FXDB`}
                    imageSizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, 50vw"
                    imageStyle="scale-[.85] hover:scale-90"
                    key={i}
                  />
                ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(
    "https://fxdb-backend.herokuapp.com/api/lenses?populate=*&sort[0]=launchDate:desc&sort[1]=name:asc"
  );
  const lenses = await res.json();
  const imageUrl = process.env.CLOUDINARY_BASE_URL;

  return {
    props: {
      lenses: lenses.data,
      imageUrl,
    },
    revalidate: 10,
  };
};
