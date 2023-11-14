import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Portal OffTheWeb</title>
        <link rel="icon" href="/icons/favicon.ico" />
        <link rel="manifest" href="/icons/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
        {/* <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WH4KP2P"
      height="0" width="0" style="display:none;visibility:hidden">`,
          }}
        /> */}
      </body>
    </Html>
  );
}
