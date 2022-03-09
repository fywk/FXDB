import { Product } from "../../lib/types";
import { convertToOunces } from "../../lib/utils/convertToOunces";
import { humanizeLensMount } from "../../lib/utils/humanizeLensMount";
import SpecItem from "./SpecItem";

export default function CameraSpecs(props: Product) {
  const lensMount = humanizeLensMount(props.lensMount);
  const sensorSize = props.sensorSize === "APSC" ? "APS-C" : "Medium Format";
  const weightOz = convertToOunces(props.weight);

  return (
    <>
      <SpecItem title="Camera type" data={props.cameraType} />
      {lensMount && <SpecItem title="Lens mount" data={lensMount} />}
      {props.cameraFocalLength && (
        <SpecItem title="Focal length" data={props.cameraFocalLength} />
      )}
      <SpecItem
        title="Maximum resolution"
        data={`${String(props.resolutionX)} × ${String(props.resolutionY)}`}
      />
      <SpecItem title="Sensor size" data={sensorSize} />
      <SpecItem title="Sensor type" data={props.sensorType} />
      <SpecItem
        title="Max shutter speed"
        data={props.maxShutterSpeed}
        footnoteId={1}
      />
      <SpecItem
        title="Weather resistant"
        data={props.weatherResistant ? "Yes" : "No"}
      />
      <SpecItem title="IBIS" data={props.IBIS ? "Yes" : "No"} />
      <SpecItem
        title="Body weight"
        data={`${props.weight.toLocaleString()}g (${weightOz.toLocaleString()}oz)`}
        footnoteId={2}
      />
    </>
  );
}
