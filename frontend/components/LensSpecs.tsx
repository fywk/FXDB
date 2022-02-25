import { Product } from "../lib/types";
import { convertToOunces, humanizeLensMount } from "../lib/util";
import ListItem from "./ListItem";

export default function LensSpecs(props: Product) {
  const lensMount = humanizeLensMount(props.lensMount);
  const focalLength = Array.isArray(props.focalLength)
    ? `${props.focalLength.join("-")}mm`
    : `${props.focalLength}mm`;
  const angleOfView = Array.isArray(props.angleOfView)
    ? `${props.angleOfView.join("° - ")}°`
    : `${props.angleOfView}°`;
  const maxAperture = Array.isArray(props.maxAperture)
    ? `F${props.maxAperture.join("-")}`
    : `F${props.maxAperture}`;
  const minFocusDistance = Array.isArray(props.minFocusDistance)
    ? `${props.minFocusDistance.join("cm - ")}cm`
    : `${props.minFocusDistance}cm`;
  const weightOz = convertToOunces(props.weight);

  return (
    <>
      <ListItem title="Lens mount" data={lensMount} />
      <ListItem title="Focal length" data={focalLength} />
      <ListItem title="Angle of view" data={angleOfView} />
      <ListItem title="Max aperture" data={maxAperture} />
      <ListItem title="Min aperture" data={`F${props.minAperture}`} />
      <ListItem title="Lens construction" data={props.opticalConstruction} />
      <ListItem title="Aperture blades" data={props.apertureBlades} />
      <ListItem title="Min focus distance" data={minFocusDistance} />
      <ListItem
        title="Max magnification ratio"
        data={props.maxMagnificationRatio}
      />
      <ListItem
        title="Filter size"
        data={props.filterSize ? `Ø${props.filterSize}cm` : `N/A`}
      />
      <ListItem
        title="Weight"
        data={`${props.weight.toLocaleString()}g (${weightOz.toLocaleString()}oz)`}
        footnoteId={1}
      />
    </>
  );
}
