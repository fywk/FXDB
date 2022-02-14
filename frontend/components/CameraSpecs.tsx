import { convertToOunces } from "../lib/util";
import ListItem from "./ListItem";

export default function CameraSpecs(props) {
  // Convert weight from grams to ounces
  const weightOz = convertToOunces(props.weight);

  return (
    <>
      <ListItem title="Camera type" data={props.cameraType} />
      {props.lensMount && (
        <ListItem title="Lens mount" data={props.lensMount} />
      )}
      {props.cameraFocalLength && (
        <ListItem title="Focal length" data={props.cameraFocalLength} />
      )}
      <ListItem
        title="Maximum resolution"
        data={`${String(props.resolutionX)} × ${String(props.resolutionY)}`}
      />
      <ListItem title="Sensor size" data={props.sensorSize} />
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
        data={`${props.weight} grams (${weightOz} ounces)`}
        footnoteId={2}
      />
    </>
  );
}
