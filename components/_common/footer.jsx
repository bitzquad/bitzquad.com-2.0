import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

function Footer() {
    return (
        <footer className="relative flex flex-col bg-gray-100" data-scroll-section>
            <div className="flex flex-col items-center justify-center py-14 pt-6 sm:flex-row sm:py-28">
                <div className="w-full sm:w-1/2">
                    <div className="felx relative ml-auto mr-0 w-full flex-row justify-center border-r border-gray-700 py-7 sm:w-9/12 lg:w-8/12">
                        <img className="w-full px-20 pb-6 sm:w-10/12  sm:px-0 sm:pb-0" src="/logo-dark.webp" alt="Bitzquad - Software Compnay - Logo Dark" />

                        <div className="mt-3 flex flex-row flex-wrap justify-evenly gap-x-7 gap-y-4 px-14 text-center text-lg font-bold text-main-900 sm:w-10/12 sm:justify-between sm:gap-y-2.5 sm:px-0">
                            <motion.a href="https://www.facebook.com/bitzquad/" target="_blank" rel="noreferrer" className="underline-link w-28 sm:w-auto" whileHover={{ scale: 1.05 }} transition={{ duration: 0.4, ease: [0.65, 0.05, 0.36, 1] }}>
                                Facebook
                            </motion.a>
                            <motion.a href="https://twitter.com/Bitzquad" target="_blank" rel="noreferrer" className="underline-link w-28 sm:w-auto" whileHover={{ scale: 1.05 }} transition={{ duration: 0.4, ease: [0.65, 0.05, 0.36, 1] }}>
                                Twitter
                            </motion.a>
                            <motion.a href="https://www.instagram.com/bitzquad/" target="_blank" rel="noreferrer" className="underline-link w-28 sm:w-auto" whileHover={{ scale: 1.05 }} transition={{ duration: 0.4, ease: [0.65, 0.05, 0.36, 1] }}>
                                Instagram
                            </motion.a>
                            <motion.a href="https://www.linkedin.com/company/bitzquad/" target="_blank" rel="noreferrer" className="underline-link w-28 sm:w-auto" whileHover={{ scale: 1.05 }} transition={{ duration: 0.4, ease: [0.65, 0.05, 0.36, 1] }}>
                                LinkedIn
                            </motion.a>
                        </div>
                        <div className=" mt-8 flex flex-row flex-wrap justify-evenly gap-x-7 gap-y-2.5 px-8 text-lg font-bold text-main-900 sm:mt-3 sm:justify-start sm:px-0">
                            <motion.a href="mailto:hello@bitzquad.com" whileHover={{ scale: 1.05 }} transition={{ duration: 0.4, ease: [0.65, 0.05, 0.36, 1] }}>
                                hello@bitzquad.com
                            </motion.a>
                        </div>
                    </div>
                </div>
                <div className="w-full sm:w-1/2">
                    <div className="relative ml-0 mr-auto flex w-full flex-row justify-evenly sm:w-9/12 lg:w-8/12">
                        <div className="mt-3 flex  flex-col flex-wrap gap-x-7 gap-y-2 text-center text-xl  sm:text-left lg:text-2xl ">
                            <a href="#services" className="underline-link w-fit cursor-pointer" data-scroll-to>
                                Services
                            </a>
                            <Link href="/about">
                                <span className="underline-link w-fit cursor-pointer">About</span>
                            </Link>
                            <Link href="/projects">
                                <span className="underline-link w-fit cursor-pointer">Projects</span>
                            </Link>
                            <Link href="/squad">
                                <span className="underline-link w-fit cursor-pointer">Squad</span>
                            </Link>
                        </div>
                        <div className="mt-3 flex flex-col flex-wrap gap-x-7 gap-y-2 text-center text-xl sm:text-left lg:text-2xl">
                            <Link href="/comingsoon">
                                <span className="underline-link w-fit cursor-pointer">Careers</span>
                            </Link>
                            <Link href="#">
                                <span className="underline-link w-fit cursor-pointer">Our Partners</span>
                            </Link>
                            <Link href="/contact">
                                <span className="underline-link w-fit cursor-pointer">Contact</span>
                            </Link>
                            <Link href="/blog">
                                <span className="underline-link w-fit cursor-pointer">Blog</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center border-t border-gray-400 py-5">
                <p className="text-center text-gray-700">
                    © {new Date().getFullYear()}{" "}
                    <a href="https://bitzquad.com" className="cursor-pointer text-sm text-blue-600">
                        Bitzquad
                    </a>
                    , All rights reserved.
                </p>
            </div>
        </footer>
    );
}

export default Footer;
