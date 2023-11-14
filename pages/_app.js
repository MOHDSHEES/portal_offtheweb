import "bootstrap/dist/css/bootstrap.css";
import { useEffect } from "react";
import "../styles/custom.css";
import { MyProvider } from "@/components/context";
import { SessionProvider } from "next-auth/react";
import Script from "next/script";

export default function App({ Component, pageProps, initialData, session }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return (
    <>
      {" "}
      {/* <Script id="google-tag-manager" strategy="afterInteractive">
        {`
   (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
   new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
   j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
   'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
   })(window,document,'script','dataLayer','GTM-WH4KP2P');
  `}
      </Script> */}
      <SessionProvider session={session}>
        <MyProvider initialData={initialData}>
          <Component {...pageProps} />
        </MyProvider>
      </SessionProvider>
    </>
  );
}
