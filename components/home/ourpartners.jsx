import React from "react";
import { motion } from "framer-motion";

const partnerList = [
    {
        name: "Deinclusive",
        url: "https://deinclusive.com/",
        image: "/assets/img/partners/partner-deinclusive.webp",
    },
    {
        name: "Wow Homies",
        url: "https://wowhomies.com/",
        image: "/assets/img/partners/partner-wow-homies.webp",
    },
    {
        name: "Splitmat",
        url: "https://splitmat.com/",
        image: "/assets/img/partners/partner-splitmat.png",
    },
];

function OurPartners() {
    return (
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
            className="partners_container"
        >
            <h2>Our Partners</h2>
            <div className="partners_card_container">
                {partnerList.map((partner, index) => (
                    <motion.div className="partners_card" key={index} whileHover={{ scale: 1.05 }} transition={{ duration: 0.4, ease: [0.65, 0.05, 0.36, 1] }}>
                        <a href={partner.url} target="_blank" rel="noreferrer">
                            <img className="partners_card_image" data-cursor-text="click" src={partner.image} alt={partner.name} />
                        </a>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}

export default OurPartners;
