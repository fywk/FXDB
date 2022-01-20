import { Html, Head, Main, NextScript } from "next/document";

export default function Document(props) {
  return (
    <Html>
      <Head />
      <body className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
