import { GetStaticPaths, GetStaticProps } from "next";

import Meta from "../../components/Meta";
import ProductDetails from "../../components/product/ProductDetails";
import { getAllCamerasPaths, getCameraDetails } from "../../lib/strapi/cameras";

export default function Camera({ camera, imageUrl }) {
  const title = `Fujifilm ${camera.name}`;
  const imageBaseUrl = `${imageUrl}/FXDB`;
  const image =
    camera.images.data.length > 0 ? camera.images.data[0].attributes : null;
  const imageSrc = `${imageBaseUrl}/${image.hash}${image.ext}`;

  return (
    <>
      <Meta title={title} type="article" image={imageSrc} />
      <ProductDetails
        type="camera"
        name={title}
        slug={camera.slug}
        launchDate={camera.launchDate}
        imageBaseUrl={imageBaseUrl}
        images={camera.images.data}
        lensMount={camera.mount.data?.attributes.name}
        weatherResistant={camera.features.weatherResistant}
        weight={camera.weight}
        dataSource={camera.dataSource}
        cameraType={camera.category.data.attributes.name}
        cameraFocalLength={camera.focalLength}
        resolutionX={camera.resolutionX}
        resolutionY={camera.resolutionY}
        sensorSize={camera.sensorSize}
        sensorType={camera.sensor.data.attributes.name}
        maxShutterSpeed={camera.maxShutterSpeed}
        IBIS={camera.features.IBIS}
      />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const cameras = await getAllCamerasPaths();
  const paths = cameras.data.map((camera) => ({
    params: { slug: String(camera.attributes.slug) },
  }));

  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const camera = await getCameraDetails(params.slug);
  const imageUrl = process.env.CLOUDINARY_BASE_URL;

  return {
    props: {
      camera: camera.data[0].attributes,
      imageUrl,
      revalidate: 10,
    },
  };
};
