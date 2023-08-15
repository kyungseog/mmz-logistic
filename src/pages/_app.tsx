import Head from "next/head";
import Footer from "@/components/Footer";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>mmz-warehouse</title>
      </Head>
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
