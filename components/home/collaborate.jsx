import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "..";

function Collaborate() {
    return (
        <div className="collaborate_">
            <div className="collaborate__bgwrapper">
                <div className="collaborate__content_wrapper">
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
                        Collaborate with Us
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
                        className="collaborate__content"
                    >
                        <div className="collaborate__content_text">
                            <p>
                                Got an innovative idea? Need tech support to make it a reality?<br></br>We got you.<br></br>
                                <br></br>Bitzquad has a capable team passionate about developing apt and innovative digital solutions through collaborations which take you through
                                an unmatched digital journey.<br></br>Your query is one tap away.
                            </p>
                            <Button className="talk-btn" parentClassName="px-0" href="/contact">
                                Let&apos;s Talk
                            </Button>
                        </div>
                        <div className="collaborate__content_image">
                            <motion.img src="/collaborate-img.webp" layoutId="userImg" alt="Bitzquad Colloborate With Us Section Image" />
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
export default Collaborate;
