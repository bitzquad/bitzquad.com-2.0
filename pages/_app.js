import "../styles/style.scss";
import { AnimatePresence, AnimateSharedLayout } from "framer-motion";
import Head from "next/head";
import React from "react";

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <link rel="icon" type="image/png" href="/favicon-16x16.webp" sizes="16x16" />
                <link rel="icon" type="image/png" href="/favicon-32x32.webp" sizes="32x32" />
                <link rel="icon" type="image/png" href="/favicon-64x64.webp" sizes="64x64" />
                <link rel="icon" type="image/png" href="/favicon-128x128.webp" sizes="128x128" />
                {/* Google Tag Manager */}
                <React.Fragment>
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                            })(window,document,'script','dataLayer','GTM-5F2DCX6');`,
                        }}
                    />
                    <noscript>
                        <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5F2DCX6" height="0" width="0" className="hidden"></iframe>
                    </noscript>
                </React.Fragment>
                {/* Google Analytics */}
                <React.Fragment>
                    <script
                        dangerouslySetInnerHTML={{
                            __html: ` window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                          
                            gtag('config', 'G-LXCP4D567W');`,
                        }}
                    />
                    <script async src="https://www.googletagmanager.com/gtag/js?id=G-LXCP4D567W" />
                </React.Fragment>
                {/* Meta Pixel */}
                <React.Fragment>
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `!function(f,b,e,v,n,t,s)
                            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                            n.queue=[];t=b.createElement(e);t.async=!0;
                            t.src=v;s=b.getElementsByTagName(e)[0];
                            s.parentNode.insertBefore(t,s)}(window, document,'script',
                            'https://connect.facebook.net/en_US/fbevents.js');
                            fbq('init', '1244588742973071');
                            fbq('track', 'PageView');`,
                        }}
                    />
                    <noscript>
                        <img height="1" width="1" className="hidden" src="https://www.facebook.com/tr?id=1244588742973071&ev=PageView&noscript=1" />
                    </noscript>
                </React.Fragment>
            </Head>
            <AnimatePresence>
                <Component {...pageProps} />
            </AnimatePresence>
        </>
    );
}

export default MyApp;
