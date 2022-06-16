import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { LayoutMain, Loader } from '../components';
import { Logo } from '../constants/images';
import { motion } from 'framer-motion';

const textRevealAnimation = {
  initial: {
    y: 200,
  },
  animate: {
    y: 0,
    transition: {
      ease: 'easeInOut',
      duration: 1,
    },
  },
};
const titleAnimation = {
  animate: {
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.03,
    },
  },
};

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading ? (
        <motion.div initial="hidden" animate="show" exit="exit">
          <Loader setLoading={setLoading} />
        </motion.div>
      ) : (
        <LayoutMain>
          <div className=" landing-container">
            <div className="landing">
              <div className="landing-content">
                <AnimatedTitle landingTitle="Solutions Beyond Technology" />
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    ease: 'easeInOut',
                    delay: 1,
                    duration: 1,
                  }}
                >
                  For athletes, high altitude produces two contradictory effects
                  on performance. For explosive events (sprints up to 400 metres
                  long jump triple jump) the reduction in atmospheric pressure
                  means there is less resistance from the atmosphere and the
                  athletes performance will generally be better at high
                  altitude.
                </motion.p>
              </div>
              <div className="landing-logo">
                <motion.img
                  className=""
                  src={Logo.src}
                  alt="bz-logo"
                  layoutId="landing-logo-image"
                  transition={{ ease: [0.6, 0.01, -0.05, 0.95], duration: 1.6 }}
                />
              </div>
            </div>
          </div>
        </LayoutMain>
      )}
    </>
  );
}

const AnimatedTitle = ({ landingTitle }) => {
  return (
    <div className="landing-title-wrapper">
      <motion.span
        className="landing-title"
        variants={titleAnimation}
        initial="initial"
        animate="animate"
      >
        {landingTitle.split(' ').map((word, index) => (
          <>
            {[...word].map((letter, i) => (
              <motion.span
                className="landing-letter"
                variants={textRevealAnimation}
              >
                {letter}
              </motion.span>
            ))}
            {index === 1 ? (
              <br />
            ) : (
              <span className="landing-word-spacer"> </span>
            )}
            <span> </span>
          </>
        ))}
      </motion.span>
    </div>
  );
};
