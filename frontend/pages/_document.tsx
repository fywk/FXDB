import { Head, Html, Main, NextScript } from "next/document";

export default function Document(props) {
  return (
    <Html lang="en">
      <Head />
      <body className="bg-gray-50 text-gray-600 antialiased dark:bg-gray-950 dark:text-gray-400">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
