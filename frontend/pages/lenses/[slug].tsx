import { GetStaticPaths, GetStaticProps } from "next";

import Meta from "../../components/Meta";
import ProductDetails from "../../components/product/ProductDetails";
import { getAllLensesPaths, getLensesDetails } from "../../lib/strapi/lenses";

export default function Lens({ lens, imageUrl }) {
  const title = `${lens.brand.data.attributes.name} ${lens.name}`;
  const imageBaseUrl = `${imageUrl}/t_rotate_lens_270deg/FXDB`;
  const image =
    lens.images.data.length > 0 ? lens.images.data[0].attributes : null;
  const imageSrc = `${imageBaseUrl}/${image.hash}${image.ext}`;

  return (
    <>
      <Meta title={title} type="article" image={imageSrc} />
      <ProductDetails
        type="lens"
        name={lens.name}
        slug={lens.slug}
        launchDate={lens.launchDate}
        imageBaseUrl={imageBaseUrl}
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
  const lenses = await getAllLensesPaths();
  const paths = lenses.data.map((lens) => ({
    params: { slug: String(lens.attributes.slug) },
  }));

  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const lens = await getLensesDetails(params.slug);
  const imageUrl = process.env.CLOUDINARY_BASE_URL;

  return {
    props: {
      lens: lens.data[0].attributes,
      imageUrl,
      revalidate: 10,
    },
  };
};
