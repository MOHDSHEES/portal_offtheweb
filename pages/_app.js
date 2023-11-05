import "bootstrap/dist/css/bootstrap.css";
import { useEffect } from "react";
import "../styles/custom.css";
import { MyProvider } from "@/components/context";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps, initialData, session }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return (
    <SessionProvider session={session}>
      <MyProvider initialData={initialData}>
        <Component {...pageProps} />
      </MyProvider>
    </SessionProvider>
  );
}
