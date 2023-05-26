import React, { ReactNode, useRef } from "react";
import Link from "next/link";
import Script from "next/script";
import Navbar from "../_common/navbar";
import Footer from "../_common/footer";
// import { LocomotiveScrollProvider } from "react-locomotive-scroll";
// import "locomotive-scroll/dist/locomotive-scroll.min.css";
import Meta from "../_common/meta";

const Layout = ({ children }) => {
    const containerRef = useRef(null);
    return (
        <>
            <Meta
                title="Bitzquad | Solutions Beyond Technology | Software Company"
                description="We are a team of thinkers, engineers, designers, and marketers who represent different cultures worldwide, working together to build better solutions
                            for a better world.  We strive to provide sustaining digital solutions in Information Systems, Business Process Re-engineering, Branding and Digital Marketing, and
                            E-Business services that serve our stakeholders' best interests."
                keywords="Bitzquad, Solutions Beyond Technology, Software Company Information Systems, Business Process Re-engineering, Branding, Digital Marketing, E-Business services"
                url={`${process.env.NEXT_PUBLIC_API_URL}/`}
                imagefb={`${process.env.NEXT_PUBLIC_API_URL}/og-img.webp`}
                alt="We are a team of thinkers, engineers, designers, and marketers who represent different cultures worldwide, working together to build better solutions
                    for a better world.  We strive to provide sustaining digital solutions in Information Systems, Business Process Re-engineering, Branding and Digital Marketing, and
                    E-Business services that serve our stakeholders' best interests."
            ></Meta>

            <Script src="/assets/js/cursorControls.js" />
            {/* <LocomotiveScrollProvider
                innerRef={containerRef}
                options={{
                    smooth: false,
                }}
                watch={[]}
            > */}
            <div className=" flex min-h-screen flex-col overflow-x-hidden" data-scroll-container ref={containerRef}>
                <Navbar animated={true} />
                {children}
                <Footer />
            </div>
            {/* </LocomotiveScrollProvider> */}
        </>
    );
};

export default Layout;
