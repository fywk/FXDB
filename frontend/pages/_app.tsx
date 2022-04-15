import "../styles/globals.css";

import PersistWrapper from "next-persist/lib/NextPersistWrapper";
import { Provider } from "react-redux";

import Layout from "../components/Layout";
import store from "../redux/store";

import type { AppProps } from "next/app";

const config = {
  method: "localStorage",
  allowList: {
    settings: ["displayMode"],
  },
};

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistWrapper wrapperConfig={config}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PersistWrapper>
    </Provider>
  );
}
