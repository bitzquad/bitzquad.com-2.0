import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function OurTeamCard({ name, title, imageurl }) {
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
      className={`ourteam__content_card`}
      style={{ backgroundImage: `url('${imageurl}')` }}
    >
      <div className="ourteam__content_card_text">
        <h4 className="name">{name}</h4>
        <p className="title">{title}</p>
      </div>
    </motion.div>
  );
}
export default OurTeamCard;
