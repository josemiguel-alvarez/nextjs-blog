import "@/css/has-pseudo-class.css";
import "@/css/prism.css";
import "@/css/tailwind.css";
import "katex/dist/katex.css";

import { ThemeProvider } from "next-themes";
import Head from "next/head";

import Analytics from "@/components/analytics";
import { ClientReload } from "@/components/ClientReload";
import LayoutWrapper from "@/components/LayoutWrapper";
import siteMetadata from "@/data/siteMetadata";

const isDevelopment = process.env.NODE_ENV === "development";
const isSocket = process.env.SOCKET;

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme}>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      {isDevelopment && isSocket && <ClientReload />}
      <Analytics />
      <LayoutWrapper>
        <Component {...pageProps} />
      </LayoutWrapper>
    </ThemeProvider>
  );
}
