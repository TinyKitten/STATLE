import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <title>STATLE</title>
          <meta
            name="description"
            content="JAPANESE TRAIN STATION GUESSNING GAME"
          />
          <meta property="og:url" content="https://statle.tinykitten.me/" />
          <meta property="og:title" content="STATLE" />
          <meta property="og:site_name" content="STATLE" />
          <meta
            property="og:description"
            content="JAPANESE TRAIN STATION GUESSNING GAME"
          />
          <meta property="og:type" content="website" />
          <meta
            property="og:image"
            content="https://statle.tinykitten.me/ogp.png"
          />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
