import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

function Services() {
    return (
        <div className="services_" id="services">
            <div className="services__bgwrapper">
                <div className="services__content_wrapper mt-0">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{
                            opacity: 1,
                            y: 0,
                            transition: {
                                duration: 0.8,
                                ease: "easeInOut",
                            },
                        }}
                        viewport={{ once: true }}
                    >
                        <span>Explore Our</span>
                        <br />
                        Services
                    </motion.h2>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{
                            opacity: 1,
                            y: 0,
                            transition: {
                                duration: 0.8,
                                ease: "easeInOut",
                            },
                        }}
                        viewport={{ once: true }}
                        className="services__content"
                    >
                        <div className="services__content_grid">
                            <div className="card">
                                <h3 className="card_title">Information Systems</h3>
                                <h4 className="card_text">Upgrade your processes with the best technology that helps your business grow.</h4>
                                <motion.button className="card_button" whileHover={{ scale: 1.05 }} transition={{ duration: 0.4, ease: [0.65, 0.05, 0.36, 1] }}>
                                    <Link href="/services/information-systems">Read more</Link>
                                </motion.button>
                            </div>
                            <div className="card">
                                <h3 className="card_title">Business Process Re-Engineering</h3>
                                <h4 className="card_text">Processes that are simple and optimized are preferable to those that are convoluted and complex.</h4>
                                <motion.button className="card_button" whileHover={{ scale: 1.05 }} transition={{ duration: 0.4, ease: [0.65, 0.05, 0.36, 1] }}>
                                    <Link href="/services/business-process-re-engineering">Read more</Link>
                                </motion.button>
                            </div>
                            <div className="card">
                                <h3 className="card_title">E-Business</h3>
                                <h4 className="card_text">Utilize digital information and advanced communication technologies to streamline different business processes.</h4>
                                <motion.button className="card_button" whileHover={{ scale: 1.05 }} transition={{ duration: 0.4, ease: [0.65, 0.05, 0.36, 1] }}>
                                    <Link href="/services/e-business">Read more</Link>
                                </motion.button>
                            </div>
                            <div className="card">
                                <h3 className="card_title">Brand Designing & Digital Marketing</h3>
                                <h4 className="card_text">The aesthetic representation of a brand&apos;s positioning and personality is found in its visual identity.</h4>
                                <motion.button className="card_button" whileHover={{ scale: 1.05 }} transition={{ duration: 0.4, ease: [0.65, 0.05, 0.36, 1] }}>
                                    <Link href="/services/brand-designing-and-digital-marketing">Read more</Link>
                                </motion.button>
                            </div>
                        </div>
                        <div className="services__content_image">
                            <motion.img src="/services-exp.webp" alt="Bitzquad Services Explain Image" />
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

export default Services;
