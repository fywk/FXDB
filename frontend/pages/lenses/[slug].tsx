import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";

import Meta from "../../components/Meta";
import ProductDetails from "../../components/product/ProductDetails";

export default function Lens({
  lens,
  imageUrl,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Meta title={`${lens.brand.data.attributes.name} ${lens.name}`} />
      <ProductDetails
        type="lens"
        name={lens.name}
        slug={lens.slug}
        launchDate={lens.launchDate}
        imageBaseUrl={`${imageUrl}/t_rotate_lens_270deg/FXDB`}
        images={lens.images.data}
        lensMount={lens.mount.data?.attributes.name}
        weatherResistant={lens.features.weatherResistant}
        weight={lens.weight}
        dataSource={lens.dataSource}
        brand={lens.brand.data.attributes.name}
        opticalConstruction={lens.opticalConstruction}
        focalLength={lens.focalLength}
        angleOfView={lens.angleOfView}
        maxAperture={lens.maxAperture}
        minAperture={lens.minAperture}
        apertureBlades={lens.apertureBlades}
        minFocusDistance={lens.minFocusDistance}
        maxMagnificationRatio={lens.maxMagnificationRatio}
        filterSize={lens.filterSize}
      />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`${process.env.STRAPI_API_URL}/api/lenses`);
  const lenses = await res.json();

  const paths = lenses.data.map((lens) => ({
    params: { slug: String(lens.attributes.slug) },
  }));

  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetch(
    `${process.env.STRAPI_API_URL}/api/lenses?filters[slug][$eq]=${params.slug}&populate=*`
  );
  const lens = await res.json();
  const imageUrl = process.env.CLOUDINARY_BASE_URL;

  return {
    props: {
      lens: lens.data[0].attributes,
      imageUrl,
      revalidate: 10,
    },
  };
};
