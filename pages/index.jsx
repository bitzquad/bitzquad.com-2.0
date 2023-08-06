import { Router, useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Head from "next/head";
// local imports

import { Collaborate, CustomerFeedback, Landing, LayoutMain, Loader, Testimonials, OurTeam, Services, OurPartners, ProjectSection } from "../components";
import Meta from "../components/_common/meta";

export default function Home() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    return (
        <>
            <Meta
                title="Bitzquad | Solutions Beyond Technology | Software Company"
                description="We are a team of thinkers, engineers, designers, and marketers who represent different cultures worldwide, working together to build better solutions
                            for a better world.  We strive to provide sustaining digital solutions in Information Systems, Business Process Re-engineering, Branding and Digital Marketing, and
                            E-Business services that serve our stakeholders' best interests."
                keywords="Bitzquad, Solutions Beyond Technology, Software Company, Information Systems, Business Process Re-engineering, Branding, Digital Marketing, E-Business services"
                url={`${process.env.NEXT_PUBLIC_API_URL}${router.asPath}`}
                imagefb={`${process.env.NEXT_PUBLIC_API_URL}/og-img.webp`}
                alt="We are a team of thinkers, engineers, designers, and marketers who represent different cultures worldwide, working together to build better solutions
                    for a better world.  We strive to provide sustaining digital solutions in Information Systems, Business Process Re-engineering, Branding and Digital Marketing, and
                    E-Business services that serve our stakeholders' best interests."
            />
            {loading && (
                <div>
                    <Loader setLoading={setLoading} />
                </div>
            )}
            <LayoutMain>
                <div data-scroll-section>
                    <Landing loading={loading} />
                    <Services />
                    <OurPartners />
                    <ProjectSection />
                    {/* <Testimonials /> */}
                    <OurTeam />
                    <Collaborate />
                </div>
            </LayoutMain>
        </>
    );
}
