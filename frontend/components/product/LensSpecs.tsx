import { Product } from "../../lib/types";
import { convertToOunces } from "../../lib/utils/convertToOunces";
import { humanizeLensMount } from "../../lib/utils/humanizeLensMount";
import SpecItem from "./SpecItem";

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
  const minAperture = Array.isArray(props.minAperture)
    ? `F${props.minAperture.join("-")}`
    : `F${props.minAperture}`;
  const minFocusDistance = Array.isArray(props.minFocusDistance)
    ? `${props.minFocusDistance.join("cm - ")}cm`
    : `${props.minFocusDistance}cm`;
  const weightOz = convertToOunces(props.weight);

  return (
    <>
      <SpecItem title="Lens mount" data={lensMount} />
      <SpecItem title="Focal length" data={focalLength} />
      <SpecItem title="Angle of view" data={angleOfView} />
      <SpecItem title="Max aperture" data={maxAperture} />
      <SpecItem title="Min aperture" data={minAperture} />
      <SpecItem title="Lens construction" data={props.opticalConstruction} />
      <SpecItem title="Aperture blades" data={props.apertureBlades} />
      <SpecItem title="Min focus distance" data={minFocusDistance} />
      <SpecItem
        title="Max magnification ratio"
        data={props.maxMagnificationRatio}
      />
      <SpecItem
        title="Filter size"
        data={props.filterSize ? `Ø${props.filterSize}cm` : `N/A`}
      />
      <SpecItem
        title="Weight"
        data={`${props.weight.toLocaleString()}g (${weightOz.toLocaleString()}oz)`}
        footnoteId={1}
      />
    </>
  );
}
