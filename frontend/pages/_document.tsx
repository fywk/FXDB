import { Html, Head, Main, NextScript } from "next/document";

export default function Document(props) {
  return (
    <Html lang="en">
      <Head />
      <body className="bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
