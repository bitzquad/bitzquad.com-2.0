import React, { ReactNode, useRef } from "react";
import Link from "next/link";
import Script from "next/script";
import Head from "next/head";
import Navbar from "../_common/navbar";
import Footer from "../_common/footer";
// import { LocomotiveScrollProvider } from "react-locomotive-scroll";
// import "locomotive-scroll/dist/locomotive-scroll.min.css";

const Layout = ({ children }) => {
    const containerRef = useRef(null);
    return (
        <>
            <Script src="/assets/js/cursorControls.js" />
            {/* <LocomotiveScrollProvider
                innerRef={containerRef}
                options={{
                    smooth: false,
                }}
                watch={[]}
            > */}
            <div className=" flex min-h-screen flex-col overflow-x-hidden" data-scroll-container ref={containerRef}>
                <Navbar animated={false} />
                {children}
                <Footer />
            </div>
            {/* </LocomotiveScrollProvider> */}
        </>
    );
};

export default Layout;
