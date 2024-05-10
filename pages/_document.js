import Document, { Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* Add GTM container code snippet */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
              <!-- Google Tag Manager -->
              <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f); })(window,document,'script','dataLayer','GTM-NJ2CT52B');</script>
              <!-- End Google Tag Manager -->
              `,
            }}
          />
        </Head>
        <body>
          {/* Add a noscript tag for browsers with JavaScript disabled */}

                <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NJ2CT52B" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>

          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;