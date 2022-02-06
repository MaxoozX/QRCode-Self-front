import Document, { Head, Html, Main, NextScript, DocumentContext } from "next/document";

import Favicon from '../Components/Favicon';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
        <title>QR Code - Self</title>
      <meta name="description" content="Organisation pour le self du LP2I." />
      <Favicon />
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