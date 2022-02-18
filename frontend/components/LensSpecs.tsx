import { convertToOunces, humanizeLensMount } from "../lib/util";
import ListItem from "./ListItem";

export default function LensSpecs(props) {
  const lensMount = humanizeLensMount(props.lensMount);
  const focalLength =
    props.focalLength?.length > 1
      ? `${props.focalLength.join("-")}mm`
      : `${props.focalLength}mm`;
  const angleOfView =
    props.angleOfView?.length > 1
      ? `${props.angleOfView.join("° - ")}°`
      : `${props.angleOfView}°`;
  const maxAperture =
    props.maxAperture?.length > 1
      ? `F${props.maxAperture.join("-")}`
      : `F${props.maxAperture}`;
  const minFocusDistance =
    props.minFocusDistance?.length > 1
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
        data={`${props.weight.toLocaleString()} grams (${weightOz.toLocaleString()} ounces)`}
        footnoteId={1}
      />
    </>
  );
}
