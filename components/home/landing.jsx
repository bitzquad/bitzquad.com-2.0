import React from "react";
import { motion } from "framer-motion";

const textRevealAnimation = {
  initial: {
    y: 200,
  },
  animate: {
    y: 0,
    transition: {
      ease: "easeInOut",
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

function Landing({ loading }) {
  return (
    <div className="landing-container">
      {!loading && <ShapesContainer />}
      <div className="landing">
        <div className="landing-content">
          <motion.img
            initial={{ opacity: 0 }}
            animate={
              !loading
                ? {
                    opacity: 1,

                    transition: { delay: 1, duration: 0.6, ease: "easeInOut" },
                  }
                : {}
            }
            src="/landing-sm.webp"
            alt="cover-img"
            className="h-auto w-full md:hidden"
          />
          <div className="px-5">
            {!loading && (
              <AnimatedTitle
                className="hidden sm:block"
                landingTitle="Solutions Beyond Technology"
              />
            )}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={!loading ? { opacity: 1, y: 0 } : {}}
              transition={{
                ease: "easeInOut",
                delay: 1.8,
                duration: 1,
              }}
              className="text-xl text-gray-700"
            >
              We are a team of thinkers, engineers, designers, and marketers
              representing different cultures worldwide. We work together to
              build sustainable solutions for a better world while serving our
              stakeholders&apos; best interests.
            </motion.div>
          </div>
        </div>
        <div className="landing-logo">
          <motion.img
            className=""
            src="/logo.webp"
            alt="bz-logo"
            layoutId="landing-logo-image"
            transition={{
              ease: [0.6, 0.01, -0.05, 0.95],
              // delay: 0.8,
              duration: 1.6,
            }}
          />
        </div>
      </div>
    </div>
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
        {landingTitle.split(" ").map((word, index) => (
          <React.Fragment key={index}>
            {[...word].map((letter, i) => (
              <motion.span
                className="landing-letter"
                key={i}
                variants={textRevealAnimation}
              >
                {letter}
              </motion.span>
            ))}
            {index === 1 ? (
              <br />
            ) : (
              <span className="landing-word-spacer"></span>
            )}
            <span> </span>
          </React.Fragment>
        ))}
      </motion.span>
    </div>
  );
};

export default Landing;

const ShapesContainer = () => {
  const shapes = [
    {
      src: "/assets/img/shapes/shape-1.webp",
      alt: "Landing Antimation Object 1",
    },
    {
      src: "/assets/img/shapes/shape-2.webp",
      alt: "Landing Antimation Object 2",
    },
    {
      src: "/assets/img/shapes/shape-3.webp",
      alt: "Landing Antimation Object 3",
    },
    {
      src: "/assets/img/shapes/shape-4.webp",
      alt: "Landing Antimation Object 4",
    },
    {
      src: "/assets/img/shapes/shape-5.webp",
      alt: "Landing Antimation Object 5",
    },
  ];

  return (
    <div className="shapes-container" data-scroll data-scroll-speed="4">
      {[...shapes].map((shape, index) => (
        <motion.img
          className="shape"
          key={index}
          src={shape.src}
          alt={shape.alt}
          layoutId={`shape-${index}`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.8, scale: 1 }}
          transition={{
            ease: [0.6, 0.01, -0.05, 0.95],
            duration: 2.6,
            delay: 1.6 + index * 0.07,
          }}
        />
      ))}
    </div>
  );
};
