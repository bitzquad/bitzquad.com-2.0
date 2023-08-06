import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import Meta from "../../components/_common/meta";
export const getStaticPaths = async () => {
    const { members } = await import("../../constants/members");
    const paths = members.map((member) => ({
        params: { id: member.id.toString() },
    }));
    return { paths, fallback: false };
};

export const getStaticProps = async (context) => {
    const { members } = await import("../../constants/members");
    const id = context.params.id;
    const member = members.find((member) => member.id === Number(id));

    return {
        props: { member },
    };
};

const socialLinksAnim = {
    animate: {
        transition: {
            delayChildren: 0.6,
            ease: [0.6, 0.01, -0.05, 0.95],
            staggerChildren: 0.06,
        },
    },
};

const socialLinkAnim = {
    initial: {
        x: 50,
        opacity: 0,
    },
    animate: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 1,
        },
    },
};

function Index({ member }) {
    const router = useRouter();
    return (
        <div className="bz-container mt-0 xl:max-w-none xl:px-0">
            {/* bg-gradient-to-tl from-purple-800/30 */}
            <Meta
                title={`${member.firstName} ${member.lastName} - ${member.role.text} - Bitzquad`}
                description="We admire and respect professionalism, integrity, sportsmanship, transparency and modesty. And we aspire to cultivate these qualities within the work
                environment as we grow.  We strive to provide sustaining digital solutions in Information Systems, Business Process Re-engineering, Branding and Digital Marketing, and
                            E-Business services that serve our stakeholders' best interests."
                keywords={`${member.firstName} ${member.lastName}, ${member.role.text} of Bitzquad, Bitzquad, Bitzquad Members, Bitzquad Team, Solutions Beyond Technology, Software Company, Information Systems, Business Process Re-engineering, Branding, Digital Marketing, E-Business services`}
                url={`${process.env.NEXT_PUBLIC_API_URL}${router.asPath}`}
                imagefb={`${process.env.NEXT_PUBLIC_API_URL}/og-img.webp`}
                alt="We admire and respect professionalism, integrity, sportsmanship, transparency and modesty. And we aspire to cultivate these qualities within the work
                environment as we grow.  We strive to provide sustaining digital solutions in Information Systems, Business Process Re-engineering, Branding and Digital Marketing, and
                            E-Business services that serve our stakeholders' best interests."
            />
            <div className="relative  flex flex-col-reverse overflow-hidden xl:h-screen xl:flex-row xl:overflow-y-scroll">
                <div className="flex h-full flex-col object-cover pr-0 xl:flex-auto xl:justify-between xl:pl-20 xl:pr-20 2xl:pl-40">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                            duration: 1,
                            delay: 0.6,
                            ease: [0.65, 0.05, 0.36, 1],
                        }}
                        exit={{ opacity: 0 }}
                    >
                        <h1 className=" mt-6 text-3xl font-bold uppercase xl:mt-20 xl:text-5xl 2xl:mt-40 3xl:text-6xl">
                            {member.firstName} {member.lastName}
                        </h1>
                        <h2 className="text-lg font-extralight text-gray-700 xl:mt-1 xl:text-2xl 2xl:mt-2 3xl:text-4xl">{member.role.text}</h2>
                        <p className=" mt-3 text-base font-medium text-gray-700 xl:mt-5  xl:text-xl 2xl:mt-10 3xl:text-4xl">{member.description}</p>
                    </motion.div>
                    <motion.div variants={socialLinksAnim} initial="initial" animate="animate" className="squad_social_links z-10 grid grid-cols-2 rounded-full py-5 text-xl xl:mt-20 xl:inline-block xl:py-5 xl:text-xl 2xl:py-10  2xl:text-3xl ">
                        {member.social.map((social, index) => (
                            <motion.span variants={socialLinkAnim} key={index} className=" pr-8 2xl:pr-10">
                                <motion.a href={social.url} rel="noreferrer" target="_blank" className="underline-link text-purple-500 transition-colors duration-500 hover:text-purple-700" whileHover={{ scale: 1.05 }} transition={{ duration: 0.4, ease: [0.65, 0.05, 0.36, 1] }}>
                                    {social.name}
                                </motion.a>
                            </motion.span>
                        ))}
                    </motion.div>
                </div>
                <Link href="/squad">
                    <motion.div className="relative flex h-full xl:mt-0 xl:aspect-video xl:w-1/3" transition={{ duration: 1 }}>
                        <motion.img initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="bottom-0 z-10  w-full lg:w-auto xl:absolute  xl:bottom-0 xl:right-0 xl:h-full xl:w-auto xl:max-w-none " src={member?.img} />
                    </motion.div>
                </Link>
                <motion.img
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                        delay: 0.4,
                        duration: 1.6,
                        ease: [0.65, 0.05, 0.36, 1],
                    }}
                    className="absolute bottom-0 left-0 hidden h-1/2 px-10 xl:block"
                    src={member.role.bgImg}
                />
            </div>
        </div>
    );
}

export default Index;
