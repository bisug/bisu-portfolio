import Head from "next/head";
import Script from "next/script";
import type { ReactNode } from "react";
import { SITE_NAME, SITE_URL } from "@/data/global";
import Footer from "../global/Footer";
import Navbar from "../global/Navbar";
import Contact from "../home/Contact";
import PageNav from "./PageNav";
import Reveal from "./Reveal";
import StructuredData from "./StructuredData";

const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;
const OG_IMAGE = `${SITE_URL}/static/misc/og.png`;
const OG_IMAGE_ALT = `${SITE_NAME} — developer and security researcher`;

function Page({
  currentPage,
  meta: { title, desc, noindex, image },
  path = "/",
  schema,
  children,
}: PageProps) {
  const pageTitle =
    currentPage === "Home"
      ? "Bisu Ghalan - Developer, Security Researcher."
      : `${title ?? currentPage} - Bisu Ghalan`;
  const pageUrl = `${SITE_URL}${path}`;
  const ogImage = image ? `${SITE_URL}${image}` : OG_IMAGE;
  const ogImageAlt = image ? `${title ?? currentPage} — preview` : OG_IMAGE_ALT;
  return (
    <div className="w-full m-auto flex flex-col items-center min-h-screen text-white">
      <Head>
        <title>{pageTitle}</title>

        <meta name="description" content={desc} />
        {/* A noindex page (404) has no canonical URL of its own; pointing it at the homepage would be misleading. */}
        {!noindex && <link rel="canonical" href={pageUrl} />}
        {noindex && <meta name="robots" content="noindex" />}

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={desc} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={ogImageAlt} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={pageUrl} />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={desc} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:image:alt" content={ogImageAlt} />

        <meta name="author" content={SITE_NAME} />
        <meta name="theme-color" content="#000a1f" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#f4f7fc" media="(prefers-color-scheme: light)" />

        {/* A noindex page (404) carries no entity data worth publishing. */}
        {!noindex && <StructuredData path={path} title={pageTitle} desc={desc} extra={schema} />}

        {GA_ID && (
          <>
            <Script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="lazyOnload"
            />
            <Script
              id="gtag"
              strategy="lazyOnload"
              dangerouslySetInnerHTML={{
                __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}', {
                page_path: window.location.pathname,
              });
            `,
              }}
            />
          </>
        )}
      </Head>

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-fun-accent focus:px-4 focus:py-2 focus:font-semibold focus:text-fun-navy-darkest"
      >
        Skip to content
      </a>

      <div className="w-full max-w-5xl mx-auto px-5 sm:px-8">
        <Navbar currentPage={currentPage} />
      </div>
      <main id="main-content" className="px-5 sm:px-8 w-full flex-1 max-w-5xl mx-auto">
        {children}
        <Reveal>
          <PageNav currentPage={currentPage} />
        </Reveal>
        {currentPage !== "Contact" && currentPage !== "404" && (
          <Reveal>
            <Contact compact />
          </Reveal>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default Page;

type PageProps = {
  currentPage: string;
  meta: {
    title?: string;
    desc: string;
    noindex?: boolean;
    /** Site-relative path to a page-specific social preview image. */
    image?: string;
  };
  path?: string;
  /** Extra JSON-LD nodes (e.g. a project) appended to the page's schema graph. */
  schema?: Record<string, unknown>[];
  children?: ReactNode;
};
