import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Router, useRouter } from "next/router";

const sideMenuLinks = [
    {
        name: "Home",
        href: "/",
    },
    {
        name: "Services",
        href: "#services",
    },
    {
        name: "About Us",
        href: "/about",
    },
    {
        name: "Projects",
        href: "/projects",
    },
    {
        name: "Team",
        href: "/squad",
    },
    {
        name: "Contact",
        href: "/contact",
    },
];
const sideMenuLinks1 = [
    {
        name: "Home",
        href: "/",
    },
    {
        name: "About Us",
        href: "/about",
    },
    {
        name: "Projects",
        href: "/projects",
    },
    {
        name: "Team",
        href: "/squad",
    },
    {
        name: "Contact",
        href: "/contact",
    },
];

const sideMenuResources = [
    {
        name: "Github",
        href: "https://github.com/bitzquad",
    },
    {
        name: "YouTube",
        href: "https://youtube.com/",
    },
    {
        name: "Blog",
        href: "/blog",
    },
    {
        name: "Academy",
        href: "/comingsoon",
    },
];

const sideMenuSocial = [
    {
        name: "LinkedIn",
        href: "https://www.linkedin.com/company/bitzquad/",
    },
    {
        name: "Twitter",
        href: "https://twitter.com/bitzquad/",
    },
    {
        name: "Instagram",
        href: "https://www.instagram.com/bitzquad/",
    },
    {
        name: "Facebook",
        href: "https://www.facebook.com/bitzquad/",
    },
];

// animations
const sidebarAnim = {
    initial: {
        opacity: 0,
        x: "100%",
    },
    animate: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 1,
            ease: [0.6, 0.01, -0.05, 0.95],
        },
    },
    exit: {
        opacity: 0,
        x: "100%",
        transition: {
            duration: 0.5,
            ease: [0.6, 0.01, -0.05, 0.95],
        },
    },
};

const sideMenuLinksAnim = {
    animate: {
        transition: {
            // delayChildren: 0.1,
            ease: [0.6, 0.01, -0.05, 0.95],
            staggerChildren: 0.06,
        },
    },
};
const sideMenuLinkAnim = {
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

// resources links animation
const resourcesLinksAnim = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0, transition: { duration: 1, delay: 0.4 } },
};

// social media links animations
const socialLinksAnim = {
    animate: {
        transition: {
            delayChildren: 0.2,
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
            delay: 0.6,
            ease: "easeInOut",
            duration: 0.8,
        },
    },
};

function SideMenu({ MenuOpen, setMenuOpen }) {
    const router = useRouter();
    // menuLink
    const SideMenuLink = ({ href, name }) => {
        return (
            <motion.div className="sidemenu__content_item" variants={sideMenuLinkAnim}>
                <motion.a
                    className="underline-link"
                    onClick={() => {
                        setMenuOpen(false);
                        router.push(href);
                    }}
                >
                    {name}
                </motion.a>
            </motion.div>
        );
    };

    return (
        <motion.div className="sidemenu__wrapper" style={{ position: "fixed", top: 0, left: 0, zIndex: 100 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="sidemenu__backdrop" onClick={() => setMenuOpen(false)}></div>
            <motion.div className="sidemenu__container" variants={sidebarAnim} initial="initial" animate="animate" exit="exit">
                <div className="sidemenu__header">
                    <motion.button
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            transition: { duration: 0.4, delay: 0.7 },
                        }}
                        exit={{ opacity: 0, scale: 0.3 }}
                        onClick={() => setMenuOpen(false)}
                        className="sidemenu__header_closebutton"
                    >
                        <svg width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M37.9375 1.5625L19.75 19.75M19.75 19.75L1.5625 37.9375M19.75 19.75L37.9375 37.9375M19.75 19.75L1.5625 1.5625" stroke="#3F3F46" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </motion.button>
                </div>
                <div className="sidemenu__content">
                    <motion.div className="sidemenu__content_items" variants={sideMenuLinksAnim} initial="initial" animate="animate">
                        {(router.asPath == "/" ? sideMenuLinks : sideMenuLinks1).map((link, index) => (
                            <SideMenuLink href={link.href} name={link.name} key={index} />
                        ))}
                    </motion.div>
                    <motion.div className="sidemenu__content_resources" variants={resourcesLinksAnim} initial="initial" animate="animate" exit="exit">
                        <h4>Resources</h4>
                        <div className="sidemenu__content_resources_wrapper">
                            {sideMenuResources.map((link, index) => (
                                <a className="underline-link" href={link.href} key={index}>
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                </div>
                <div className="sidemenu__footer">
                    <motion.div className="social-links" variants={socialLinksAnim} initial="initial" animate="animate">
                        <motion.h4 variants={socialLinkAnim} animate="animate" initial="initial">
                            Social
                        </motion.h4>
                        <div className="social-links_wrapper">
                            {sideMenuSocial.map((link, index) => (
                                <motion.div key={index} className="social-links_item" variants={socialLinkAnim} animate="animate" initial="initial" whileHover={{ scale: 1.05 }} transition={{ duration: 0.4, ease: [0.65, 0.05, 0.36, 1] }}>
                                    <a href={link.href} className="underline-link" target="_blank" rel="noreferrer">
                                        {link.name}
                                    </a>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.25,
                            delay: 1,
                        }}
                        className="multilingual"
                    >
                        <button className="flex aspect-square h-14 items-center justify-center rounded-full transition-all duration-300 hover:bg-black hover:text-white">En</button>
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default SideMenu;
