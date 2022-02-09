import Head from "next/head";
import { useRouter } from "next/router";

export default function Meta({ title, keywords, description }) {
  const router = useRouter();
  if (router.pathname !== "/") title = `${title} | FXDB`;

  return (
    <Head>
      <meta charSet="utf-8" />
      <title>{title}</title>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, viewport-fit=cover"
      />
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}

Meta.defaultProps = {
  title: "FXDB: Fujifilm X and GFX Database",
  description: "Fujifilm X and GFX Database",
  keywords: "fujifilm, x-mount, database",
};
