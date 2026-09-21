import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" suppressHydrationWarning>
        <Head>
          <script
            // Set theme before paint to avoid a flash of the wrong mode.
            dangerouslySetInnerHTML={{
              __html:
                "try{var t=localStorage.getItem('theme');if(t==='light'||(!t&&matchMedia('(prefers-color-scheme: light)').matches))document.documentElement.classList.add('light')}catch(e){}",
            }}
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/static/favicon/apple-touch-icon.png"
          />
          <link rel="icon" type="image/svg+xml" href="/static/logos/logo_no_text.svg" />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/static/favicon/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/static/favicon/favicon-16x16.png"
          />
          <link rel="manifest" href="/static/favicon/site.webmanifest" />
          {/* Without JS, Reveal/FadeImage never fire — force content visible. */}
          <noscript>
            <style>{".reveal{opacity:1;transform:none}img.img-loading{opacity:1}"}</style>
          </noscript>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
