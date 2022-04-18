import { TablerIcon } from "@tabler/icons";

export type AllTimeViews = {
  views: {
    siteWide: number;
    cameras: number;
    lenses: number;
  };
};

type Camera = {
  cameraType?: string;
  cameraFocalLength?: string;
  cameraMaxAperture?: number;
  resolutionX?: number;
  resolutionY?: number;
  sensorSize?: string;
  sensorType?: string;
  maxShutterSpeed?: string;
  IBIS?: boolean;
};

export type DisplayOption = {
  value: string;
  label: string;
  icon: TablerIcon;
};

export type Error = {
  message: string;
};

type Lens = {
  brand?: string;
  opticalConstruction?: string;
  focalLength?: number | number[];
  angleOfView?: number | number[];
  maxAperture?: number | number[];
  minAperture?: number;
  apertureBlades?: number;
  minFocusDistance?: number | number[];
  maxMagnificationRatio?: string;
  filterSize?: number;
};

export type NavLink = {
  id: number;
  name: string;
  url: string;
};

// prettier-ignore
export type Product = Camera & Lens & {
  type: "camera" | "lens";
  name: string;
  slug: string;
  launchDate: string;
  imageBaseUrl: string;
  images: string;
  lensMount: string;
  weatherResistant: boolean;
  weight: number;
  dataSource: string;
};

export type ProductCardProps = {
  index?: number;
  type: "grid" | "list" | "table-row";
  product: any;
  path: string;
  imageBaseUrl: string;
  imageSizes: string;
  imageStyle?: string;
};

export type ProductsProps = {
  products: { attributes: Product }[];
  category: string;
  description: string;
  imageBaseUrl: string;
  imageSizes: string;
  imageStyle: string;
};

export type Views = {
  views: number;
};
