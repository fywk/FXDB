import { convertToOunces, humanizeLensMount } from "../lib/util";
import ListItem from "./ListItem";

export default function CameraSpecs(props) {
  const lensMount = humanizeLensMount(props.lensMount);
  const sensorSize = props.sensorSize === "APSC" ? "APS-C" : "Medium Format";
  const weightOz = convertToOunces(props.weight);

  return (
    <>
      <ListItem title="Camera type" data={props.cameraType} />
      {lensMount && <ListItem title="Lens mount" data={lensMount} />}
      {props.cameraFocalLength && (
        <ListItem title="Focal length" data={props.cameraFocalLength} />
      )}
      <ListItem
        title="Maximum resolution"
        data={`${String(props.resolutionX)} × ${String(props.resolutionY)}`}
      />
      <ListItem title="Sensor size" data={sensorSize} />
      <ListItem title="Sensor type" data={props.sensorType} />
      <ListItem
        title="Max shutter speed"
        data={props.maxShutterSpeed}
        footnoteId={1}
      />
      <ListItem
        title="Weather resistant"
        data={props.weatherResistant ? "Yes" : "No"}
      />
      <ListItem
        title={
          <span
            className="relative cursor-help after:ml-1 hover:after:content-['(In-Body_Image_Stabilisation)'] focus:after:content-['(In-Body_Image_Stabilisation)']"
            tabIndex={0}
          >
            IBIS
          </span>
        }
        data={props.IBIS ? "Yes" : "No"}
      />
      <ListItem
        title="Body weight"
        data={`${props.weight.toLocaleString()} grams (${weightOz.toLocaleString()} ounces)`}
        footnoteId={2}
      />
    </>
  );
}
