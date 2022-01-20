import Head from "next/head";

export default function Meta({ title, keywords, description }) {
  return (
    <Head>
      <meta charSet="utf-8" />
      <title>
        {title}: {description}
      </title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}

Meta.defaultProps = {
  title: "FXDB",
  description: "Fujifilm X and GFX Database",
  keywords: "fujifilm, x-mount, database",
};
