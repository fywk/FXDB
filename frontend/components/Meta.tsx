import Head from "next/head";
import { useRouter } from "next/router";

import { siteConfig as site } from "../lib/config/site";

export default function Meta({ baseUrl, title, description, type, image }) {
  const router = useRouter();
  if (router.pathname !== "/")
    title = `${title} ${site.titleSeparator} ${site.name}`;

  return (
    <Head>
      <meta charSet="utf-8" />
      <title>{title}</title>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, viewport-fit=cover"
      />
      <meta name="description" content={description} key="description" />
      <link
        rel="canonical"
        href={`${baseUrl}${router.asPath}`}
        key="canonical"
      />
      <meta name="twitter:card" content="summary" key="twitter:card" />
      <meta property="og:type" content={type} key="og:type" />
      <meta property="og:site_name" content={site.name} key="og:site_name" />
      <meta property="og:title" content={title} key="og:title" />
      <meta
        property="og:description"
        content={description}
        key="og:description"
      />
      <meta
        property="og:url"
        content={`${baseUrl}${router.asPath}`}
        key="og:url"
      />
      {image && <meta property="og:image" content={image} key="og:image" />}
    </Head>
  );
}

Meta.defaultProps = {
  baseUrl: site.baseURL,
  title: `${site.name} ${site.titleSeparator} ${site.title}`,
  description: site.description,
  type: "website",
  image: null,
};
