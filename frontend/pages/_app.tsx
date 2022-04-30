import "../styles/globals.css";

import PersistWrapper from "next-persist/lib/NextPersistWrapper";
import { Provider } from "react-redux";

import Layout from "../components/Layout";
import { useScrollRestoration } from "../lib/hooks/useScrollRestoration";
import store from "../redux/store";

import type { AppProps } from "next/app";

const persistConfig = {
  method: "localStorage",
  allowList: {
    settings: ["displayMode"],
  },
};

export default function MyApp({ Component, pageProps, router }: AppProps) {
  useScrollRestoration(router);

  return (
    <Provider store={store}>
      <PersistWrapper wrapperConfig={persistConfig}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PersistWrapper>
    </Provider>
  );
}
