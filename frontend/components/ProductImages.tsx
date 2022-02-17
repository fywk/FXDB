import Image from "next/image";

export default function ProductImages(props) {
  const image = props.images.length > 0 ? props.images[0].attributes : null;
  const imageSrc = `${props.imageBaseUrl}/${image.hash}${image.ext}`;

  return (
    <Image
      src={imageSrc}
      alt={image.alternativeText}
      layout="fill"
      objectFit="scale-down"
      sizes="(min-width: 768px) 50vw, 100vw"
      className="origin-center scale-[.85] duration-300"
    />
  );
}
