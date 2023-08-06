import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SideMenu from "./sidemenu";

import Link from "next/link";

function Navbar({ animated = false }) {
    const [menuOpen, setMenuOpen] = useState(false);
    // const { scroll } = useLocomotiveScroll();
    // useEffect(() => {
    //     if (!scroll) {
    //         return;
    //     }
    //     if (menuOpen) {
    //         scroll.stop();
    //     } else {
    //         scroll.start();
    //     }
    // }, [menuOpen]);

    return (
        <>
            <motion.nav
                data-scroll-section
                initial={
                    animated
                        ? {
                              opacity: 0,
                              y: -100,
                          }
                        : {}
                }
                animate={
                    animated
                        ? {
                              opacity: 1,
                              y: 0,
                              transition: {
                                  duration: 1,
                                  delay: 2,
                                  ease: "easeInOut",
                              },
                          }
                        : {}
                }
                className="navbar"
            >
                <Link className="" href="/">
                    <a href="/" className="navbar-brand">
                        <img className="h-10" src="/logo-dark.webp" alt="Bitzquad - Solutions Beyond Technology - IT Service Compnay - Logo Dark" />
                    </a>
                </Link>
                <div className="navbar-links">
                    <Link href="/blog">
                        <span className="navbar-link underline-link cursor-pointer" data-cursor="-opaque">
                            Blog
                        </span>
                    </Link>
                    {/* {router.asPath == "/" && (
                        <a href="#services" data-scroll-to className="navbar-link underline-link" data-cursor="-opaque">
                            Services
                        </a>
                    )} */}
                    <Link href="/about">
                        <span className="navbar-link underline-link cursor-pointer" data-cursor="-opaque">
                            About
                        </span>
                    </Link>

                    <Link href="/contact">
                        <span className="navbar-link underline-link cursor-pointer" data-cursor="-opaque">
                            Contact
                        </span>
                    </Link>
                    <button className="menu-button" data-cursor="-opaque" onClick={() => setMenuOpen(true)}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 19L3 12M3 12L10 5M3 12H21" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Menu
                    </button>
                </div>
                <div className="block lg:hidden">
                    <button onClick={() => setMenuOpen(true)} className="flex items-center gap-x-2 font-bold text-gray-700 transition-all duration-300 hover:-translate-x-2 hover:text-black">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 19L3 12M3 12L10 5M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="hidden md:block">Menu</span>
                    </button>
                </div>
            </motion.nav>
            <AnimatePresence>{menuOpen && <SideMenu MenuOpen={menuOpen} setMenuOpen={setMenuOpen} />}</AnimatePresence>
        </>
    );
}

export default Navbar;
