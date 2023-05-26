import React from "react";
import Link from "next/link";
import { LayoutSubPages } from "../../components";
import Meta from "../../components/_common/meta";
import { useRouter } from "next/router";
function Index() {
    const router = useRouter();
    return (
        <LayoutSubPages>
            <Meta
                title="Bitzquad | About Us"
                description="We are a booming start-up in the tech ecosystem, based in Sri Lanka, focusing on providing diverse solutions in INFORMATION SYSTEMS, BUSINESS PROCESS
                RE-ENGINEERING, BRANDING AND DIGITAL MARKETING and E-BUSINESS services in both local and international markets. Our passionate and competent team is keen to bring futuristic and pragmatic solutions that transcend your expectations. We believe our purpose is to upscale
                the value of ideas of our clients and prospects."
                keywords="About Bitzquad, Bitzquad, Solutions Beyond Technology, Software Company, Information Systems, Business Process Re-engineering, Branding, Digital Marketing, E-Business services"
                url={`${process.env.NEXT_PUBLIC_API_URL}${router.asPath}`}
                imagefb={`${process.env.NEXT_PUBLIC_API_URL}/og-img.webp`}
                alt="We are a booming start-up in the tech ecosystem, based in Sri Lanka, focusing on providing diverse solutions in information systems, business process
                re-engineering, Branding and Digital Marketing and E-Business services in both local and international markets. Our passionate and competent team is keen to bring futuristic and pragmatic solutions that transcend your expectations. We believe our purpose is to upscale
                the value of ideas of our clients and prospects."
            />
            <div className="bz-container relative mx-auto mt-0 h-full w-full bg-gray-50 md:bg-transparent lg:mt-44" data-scroll-section>
                <div className=" px-5 py-10 lg:py-0">
                    <h1 className="text-3xl font-semibold uppercase lg:text-5xl">About Us</h1>
                    <p className="mt-4 text-sm  tracking-widest text-gray-700 lg:mt-5 lg:text-xl xl:w-10/12">
                        We are a booming start-up in the tech ecosystem, based in Sri Lanka, focusing on providing diverse solutions in information systems, business process re-engineering, Branding and Digital Marketing and E-Business services in both local and international markets.
                        <br></br> <br></br>
                        Our passionate and competent team is keen to bring futuristic and pragmatic solutions that transcend your expectations. We believe our purpose is to upscale the value of ideas of our clients and prospects. <br></br> <br></br>
                        Our solution-oriented strategies support us in gathering the right resources at the right time for the right purpose.
                    </p>
                </div>
                <div className="mb-20 px-5 pt-10 lg:pt-32 ">
                    <div className="mb-10 flex  w-full flex-col-reverse  md:flex-row lg:mb-24">
                        <div
                            style={{
                                background: "rgb(249, 250, 251)",
                                background: "linear-gradient(90deg, rgba(249, 250, 251,1) 0%, rgba(249, 250, 251,1) 50%, rgba(255,255,255,0) 100%)",
                            }}
                            className="relative z-10 flex h-auto min-h-[20rem] flex-col pb-14 pt-4 md:z-auto  md:w-1/2 md:bg-none lg:mt-0 lg:pb-0  "
                        >
                            <h3 className=" mb-2 text-xl font-semibold tracking-widest first-letter:capitalize lg:text-2xl 2xl:text-3xl ">We are a team of </h3>
                            <h3 className=" text-2xl font-semibold tracking-widest first-letter:capitalize lg:text-3xl 2xl:text-4xl ">Solutions</h3>
                            <p className="mr-auto mt-1 text-sm text-gray-700 md:mr-4 md:text-lg lg:mt-2 lg:w-10/12 2xl:mt-4 2xl:text-xl">
                                Team Bitzquad has a shared vision to deliver satisfactory tech solutions which create value for our clients and prospects.
                                <br></br> <br></br>
                                The team&apos;s cultural diversity, skills, knowledge, sense of work ethics, and ability to think outside the box don&apos;t fail to bring unique perspectives to the table to provide viable solutions for your tech needs. <br></br> <br></br>
                                As a team with a clear vision, we value the power of unity, learning and growth, and revelling small steps of the journey ahead.
                            </p>
                            <img src="/assets/img/about/1.svg" className="absolute bottom-4 w-8/12 md:left-8 md:w-auto md:scale-x-110" />
                        </div>
                        <div className="relative md:w-1/2 lg:aspect-[9/6]">
                            <div className="bottom-1/2 w-full overflow-hidden md:h-full lg:aspect-[8/7] lg:h-auto ">
                                <img src="\assets\img\about\about-team-image.webp" className="absolute left-auto right-0 h-80 w-7/12 object-cover sm:w-full md:relative md:h-full lg:aspect-[4/5] lg:h-auto" />
                            </div>
                        </div>
                    </div>
                    <div className="mb-10 flex  w-full flex-col-reverse  md:flex-row-reverse lg:mb-24">
                        <div
                            style={{
                                background: "rgb(249, 250, 251)",
                                background: "linear-gradient(90deg, rgba(249, 250, 251,1) 0%, rgba(249, 250, 251,1) 50%, rgba(255,255,255,0) 100%)",
                            }}
                            className="relative z-10 ml-0 flex h-auto min-h-[20rem] flex-col pb-14 pt-4  md:z-auto md:ml-10 md:w-1/2 md:bg-none  lg:mt-0 lg:pb-0"
                        >
                            <h3 className=" mb-2 text-xl font-semibold tracking-widest first-letter:capitalize lg:text-2xl 2xl:text-3xl ">We elevate your</h3>
                            <h3 className=" text-2xl font-semibold tracking-widest first-letter:capitalize lg:text-3xl 2xl:text-4xl ">Inspiration</h3>
                            <p className="mr-auto mt-1 text-sm text-gray-700 md:mr-4 md:text-lg lg:mt-2 lg:w-10/12 2xl:mt-4 2xl:text-xl">
                                We elevate your abstract concept into a reality with an agile mindset. And we use the latest technologies and tools to make the products better, reliable, faster, and secure in the rapidly changing technological environment. <br></br> <br></br>
                                Scrum directs team Bitzquad to deliver a high-quality output that ensures the meeting of minds of our clients. We tailor the framework to assure the smooth functioning of the entire project, enhancing our products&apos; efficiency and effectiveness while actively engaging the client throughout the journey. Along with the scrum, we use the following latest technologies and tools to build our products recognized by professionals in the industry:
                            </p>
                            <img src="/assets/img/about/2.svg" className="absolute bottom-4 w-8/12 md:left-8 md:w-auto md:scale-x-110" />
                        </div>
                        <div className="relative md:w-1/2 lg:aspect-[9/6]">
                            <div className="bottom-1/2 w-full overflow-hidden md:h-full lg:aspect-[8/7] lg:h-auto ">
                                <img src="\assets\img\about\about-elevate-image.webp" className="absolute left-auto right-0 min-h-[20rem] w-7/12 object-cover sm:w-full md:relative md:h-full lg:aspect-[4/5] lg:h-auto" />
                            </div>
                        </div>
                    </div>
                    <div className="mb-10 flex  w-full flex-col-reverse  md:flex-row lg:mb-24">
                        <div
                            style={{
                                background: "rgb(249, 250, 251)",
                                background: "linear-gradient(90deg, rgba(249, 250, 251,1) 0%, rgba(249, 250, 251,1) 50%, rgba(255,255,255,0) 100%)",
                            }}
                            className="relative z-10 flex h-auto min-h-[20rem] flex-col pb-14 pt-4 md:z-auto  md:w-1/2 md:bg-none lg:mt-0 lg:pb-0  "
                        >
                            <h3 className=" mb-2 text-xl font-semibold tracking-widest first-letter:capitalize lg:text-2xl 2xl:text-3xl ">You may also be </h3>
                            <h3 className=" text-2xl font-semibold tracking-widest first-letter:capitalize lg:text-3xl 2xl:text-4xl ">Interested In...</h3>
                            <p className="mr-auto mt-1 flex flex-col text-sm text-gray-700 md:mr-4 md:text-lg lg:mt-2 lg:w-10/12 2xl:mt-4 2xl:text-xl">
                                <span className="mb-1 font-semibold">Sustainability</span>
                                Bitzquad focuses on providing the services while being conscious of the effect of our products on the ecology, environment and society, which are three pillars of sustainability. We strive to create digital solutions that sustain better conditions for future generations.<br></br>
                                <br></br>
                                <span className="mb-1 font-semibold">Agility</span>
                                We aim to persevere with the changes in both internal and external environments and move on quickly with collective decisions.<br></br> <br></br>
                                <span className="mb-1 font-semibold">Customer-Centric Culture</span>
                                Bitzquad prioritizes the best processes and practices for our clients and prospects to create a positive and flourishing experience for them.
                                <br></br> <br></br>
                                <span className="mb-1 font-semibold">Passion</span>
                                Our team is a passion-driven team, where we are assertive in the work we are involved in, which empowers us to create tremendous value for the company.<br></br> <br></br>
                                <span className="mb-1 font-semibold">Collaboration</span>
                                As a team, we value the active participation and inclusiveness of our partners and clients in our projects because it leverages the value of the outcome through their skills, experience and perspectives.<br></br> <br></br>
                                <span className="mb-1 font-semibold">Innovation</span>
                                The core of the Bitzquad is to differentiate the processes using the latest technologies and tools to make the product&apos;s user experience positive and closer to them.
                            </p>
                            <img src="/assets/img/about/3.svg" className="absolute bottom-4 w-8/12 md:left-8 md:w-auto md:scale-x-110" />
                        </div>
                        <div className="relative md:w-1/2 lg:aspect-[9/6]">
                            <div className="bottom-1/2 w-full overflow-hidden md:h-full lg:aspect-[8/7] lg:h-auto ">
                                <img src="\assets\img\about\about-int-image.webp" className="absolute left-auto right-0 h-80 w-7/12 object-cover sm:w-full md:relative md:h-full lg:aspect-[4/5] lg:h-auto" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutSubPages>
    );
}

export default Index;
