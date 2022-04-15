declare module "next-persist/lib/NextPersistWrapper" {
  interface AllowListObject {
    [key: string]: string[];
  }

  interface StorageConfigObject {
    method: string;
    allowList: AllowListObject;
  }

  interface WrapperProps {
    wrapperConfig: StorageConfigObject;
    children: React.ReactNode;
  }

  declare const NextPersistWrapper: (props: WrapperProps) => JSX.Element;
  export default NextPersistWrapper;
}
