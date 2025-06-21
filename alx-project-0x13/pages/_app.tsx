import Layout from "@/components/layouts/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ImageProvider } from "@/context/ImageContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ImageProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ImageProvider>
  );
}
