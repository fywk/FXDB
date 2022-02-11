import Head from "next/head";
import { useRouter } from "next/router";

export default function Meta({ baseUrl, title, description, keywords }) {
  const router = useRouter();
  if (router.pathname !== "/") title = `${title} - FXDB`;

  return (
    <Head>
      <meta charSet="utf-8" />
      <title>{title}</title>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, viewport-fit=cover"
      />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="icon" href="/favicon.ico" />
      <link rel="canonical" href={`${baseUrl}${router.asPath}`} />
    </Head>
  );
}

Meta.defaultProps = {
  baseUrl: "https://fxdb.vercel.app",
  title: "FXDB - Fujifilm X and GFX Database",
  description: "Fujifilm X and GFX Database",
  keywords: "fujifilm, x-mount, database",
};
