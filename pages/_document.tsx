import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

/***
 * If you want to customize the <html> tag, for example to add the lang attribute, you can do so by creating a pages/_document.js file.
 */