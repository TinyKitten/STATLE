import Head from "next/head";

const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;
const existsGaId = GA_ID !== "";

const GoogleAnalytics = () => {
  if (!existsGaId) {
    return null;
  }

  return (
    <Head>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
      
                gtag('config', '${GA_ID}');
      `,
        }}
      />
    </Head>
  );
};

export default GoogleAnalytics;
