import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import Meta from "../../components/Meta";
import ProductDetails from "../../components/ProductDetails";

export default function CameraPage({
  camera,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const lensMount =
    camera.mount.data.attributes.name === "X-mount"
      ? "Fujifilm X"
      : "Fujifilm G";
  const sensorSize = camera.sensorSize === "APSC" ? "APS-C" : "Medium Format";

  return (
    <>
      <Meta title={camera.name} />
      <ProductDetails
        type="camera"
        slug={camera.slug}
        name={camera.name}
        launchDate={camera.launchDate}
        lensMount={lensMount}
        weatherResistant={camera.features.weatherResistant}
        weight={camera.weight}
        dataSource={camera.dataSource}
        cameraType={camera.category.data.attributes.name}
        cameraFocalLength={camera.focalLength}
        resolutionX={camera.resolutionX}
        resolutionY={camera.resolutionY}
        sensorSize={sensorSize}
        sensorType={camera.sensor.data.attributes.name}
        maxShutterSpeed={camera.maxShutterSpeed}
        IBIS={camera.features.IBIS}
      />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch("https://fxdb-backend.herokuapp.com/api/cameras");
  const cameras = await res.json();

  const paths = cameras.data.map((camera) => ({
    params: { slug: String(camera.attributes.slug) },
  }));

  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetch(
    `https://fxdb-backend.herokuapp.com/api/cameras?filters[slug][$eq]=${params.slug}&populate=*`
  );
  const camera = await res.json();

  return {
    props: {
      camera: camera.data[0].attributes,
      revalidate: 10,
    },
  };
};
