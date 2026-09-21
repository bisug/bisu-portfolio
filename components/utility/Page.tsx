import Head from "next/head";
import Script from "next/script";
import type { ReactNode } from "react";
import Footer from "../global/Footer";
import Navbar from "../global/Navbar";

const SITE_URL = "https://bisu.com.np";
const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;

function Page({ currentPage, meta: { title, desc, noindex }, path = "/", children }: PageProps) {
  const pageTitle =
    currentPage === "Home"
      ? "Bisu Ghalan - Developer, Security Researcher."
      : `${title ?? currentPage} - Bisu Ghalan`;
  const pageUrl = `${SITE_URL}${path}`;
  return (
    <div className="w-full m-auto flex flex-col items-center min-h-screen text-white">
      <Head>
        <title>{pageTitle}</title>

        <meta name="description" content={desc} />
        {/* A noindex page (404) has no canonical URL of its own; pointing it at the homepage would be misleading. */}
        {!noindex && <link rel="canonical" href={pageUrl} />}
        {noindex && <meta name="robots" content="noindex" />}

        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={desc} />
        <meta property="og:image" content={`${SITE_URL}/static/misc/og.png`} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={pageUrl} />
        <meta property="twitter:title" content={pageTitle} />
        <meta property="twitter:description" content={desc} />
        <meta property="twitter:image" content={`${SITE_URL}/static/misc/og.png`} />

        {GA_ID && (
          <>
            <Script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script
              id="gtag"
              strategy="afterInteractive"
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
  };
  path?: string;
  children?: ReactNode;
};
