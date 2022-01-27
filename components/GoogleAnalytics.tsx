import Script from "next/script";

const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;
const existsGaId = GA_ID !== "";

const GoogleAnalytics = () => {
  if (!existsGaId) {
    return null;
  }

  return (
    <>
      <Script
        defer
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga" defer strategy="afterInteractive">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', ${GA_ID});
      `}
      </Script>
    </>
  );
};

export default GoogleAnalytics;
