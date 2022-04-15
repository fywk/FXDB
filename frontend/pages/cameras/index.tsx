import "../../lib/utils/removePunctuationSpaces.ts";

import { format } from "date-fns";
import { GetStaticProps } from "next";

import Products from "../../components/Products";
import { getAllCameras } from "../../lib/strapi/cameras";

export default function Cameras({ cameras, imageUrl }) {
  const numOfCameras = cameras.length;
  const firstCamera = cameras.at(-1).attributes;
  const latestCamera = cameras.at(0).attributes;
  const [firstLaunchName, firstLaunchYear] = [
    firstCamera.name,
    format(new Date(firstCamera.launchDate), "y"),
  ];
  const [latestLaunchName, latestLaunchDate] = [
    latestCamera.name,
    format(new Date(latestCamera.launchDate), "d MMMM y"),
  ];
  const description = `Fujifilm has released a total of ${numOfCameras} cameras on both the X and GFX series since the introduction of the first X Series camera, the ${firstLaunchName}, back in ${firstLaunchYear}. The ${latestLaunchName} is the company's latest camera, released on ${latestLaunchDate}.`;

  return (
    <Products
      products={cameras}
      category="cameras"
      description={description}
      imageBaseUrl={`${imageUrl}/FXDB`}
      imageSizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, 50vw"
      imageStyle="scale-75 hover:scale-[.8]"
    />
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const cameras = await getAllCameras();
  const imageUrl = process.env.CLOUDINARY_BASE_URL;

  return {
    props: {
      cameras: cameras.data,
      imageUrl,
    },
    revalidate: 10,
  };
};
