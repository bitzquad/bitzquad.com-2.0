import "../styles/style.scss";
import { AnimatePresence, AnimateSharedLayout } from "framer-motion";
import Head from "next/head";
import React from "react";

import dynamic from "next/dynamic";
import { Fragment } from "react";

//const LayoutMain = dynamic(() => import("../components/_layouts/main.layout"), { ssr: true });
const LayoutAdmin = dynamic(() => import("../components/_layouts/admin.layout"), { ssr: false });

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
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
            {Component.layout == "admin" && (
                <LayoutAdmin>
                    <Component {...pageProps} />
                </LayoutAdmin>
            )}
            {Component.layout != "admin" && (
                <AnimatePresence>
                    <Component {...pageProps} />
                </AnimatePresence>
            )}
        </>
    );
}

export default MyApp;
