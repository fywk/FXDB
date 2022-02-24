import { Head, Html, Main, NextScript } from "next/document";

export default function Document(props) {
  return (
    <Html>
      <Head />
      <body className="bg-gray-50 text-gray-600 dark:bg-gray-900 dark:text-gray-400">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
