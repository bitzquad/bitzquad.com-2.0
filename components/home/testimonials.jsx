import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const contentAnim = {
    initial: { x: "100%" },
    animate: {
        x: "0",
        transition: {
            duration: 1.6,
            ease: [0.77, 0, 0.18, 1],
        },
    },
    exit: {
        x: "-100%",
        opacity: 0.5,
        transition: {
            // delay: 0.6,
            duration: 1,
            ease: [0.73, 0.02, 0.06, 0.87],
        },
    },
};

const contentAnimMobile = {
    initial: { opacity: 0 },
    animate: {
        x: "0",
        opacity: 1,
        transition: {
            duration: 1.6,
            ease: [0.77, 0, 0.18, 1],
        },
    },
    exit: {
        opacity: 0,
        transition: {
            // delay: 0.6,
            duration: 1,
            ease: [0.73, 0.02, 0.06, 0.87],
        },
    },
};

function CustomerFeedback() {
    const [testimonials] = useState([
        {
            name: "Bobby Mala",
            role: "CEO of ABC Holdings",
            text: "Bitzquad is a great company to work with. They are very responsive and always provide a great service. I highly recommend them to anyone looking for a great company to work with.",
            img: "/testimonial-1.webp",
        },
        {
            name: "Dean Winchester",
            role: "Product Manager at Winchester Groups",
            text: "A customer review is a reflection of a customer's experience with your company's products or services. Reviews can be found on sites such as Google Reviews, Amazon, Yelp, and Facebook.",
            img: "/testimonial-2.webp",
        },
        {
            name: "Anne Hathaway",
            role: "CEO of Annie Company (pvt) LTD",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris egestas, leo at mattis elementum, lacus enim facilisis tellus, ac pretium enim libero eget massa. Curabitur metus felis, pulvinar sed finibus nec, suscipit at urna. Donec rutrum elementum massa, sit amet tempus diam condimentum eget.",
            img: "/testimonial-3.webp",
        },
        {
            name: "Deboro Desmond",
            role: "CTO of Desmond Holdings",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris egestas, leo at mattis elementum, lacus enim facilisis tellus, ac pretium enim libero eget massa. Curabitur metus felis, pulvinar sed finibus nec, suscipit at urna. Donec rutrum elementum massa, sit amet tempus diam condimentum eget.",
            img: "/testimonial-4.webp",
        },
        {
            name: "Angie Holan",
            role: "Product Manager at Amazon",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris egestas, leo at mattis elementum, lacus enim facilisis tellus, ac pretium enim libero eget massa. Curabitur metus felis, pulvinar sed finibus nec, suscipit at urna. Donec rutrum elementum massa, sit amet tempus diam condimentum eget.",
            img: "/testimonial-5.webp",
        },
    ]);
    const [selectedTestimonial, setSelectedTestimonial] = useState(testimonials[0]);

    useEffect(() => {
        const interval = setInterval(() => {
            let i = testimonials.indexOf(selectedTestimonial);
            if (i < testimonials.length - 1) {
                i++;
                setSelectedTestimonial(testimonials[i]);
            } else {
                setSelectedTestimonial(testimonials[0]);
            }
        }, 10000);
        return () => clearInterval(interval);
    }, [selectedTestimonial]);

    return (
        <div className="testimonials_ ">
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
                Testimonials
            </motion.h2>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{
                    opacity: 1,
                    y: 0,
                    transition: {
                        // delay: 0.4,
                        duration: 0.8,
                        ease: "easeInOut",
                    },
                }}
                viewport={{ once: true }}
                className="testimonials__content__item"
            >
                <div className="testimonials__content__item_image">
                    <AnimatePresence exitBeforeEnter>
                        <motion.img
                            key={testimonials.indexOf(selectedTestimonial)}
                            initial={{ x: "100%" }}
                            animate={{
                                x: 0,
                                transition: {
                                    duration: 1.6,
                                    ease: [0.77, 0, 0.18, 1],
                                },
                            }}
                            exit={{
                                // x: '100%',
                                opacity: 0,
                                transition: {
                                    duration: 1,
                                    ease: [0.73, 0.02, 0.06, 0.87],
                                },
                            }}
                            src={selectedTestimonial?.img}
                            alt="Bitzquad testimonial section background"
                        />
                    </AnimatePresence>
                </div>
                <div className="testimonials__content__item_content">
                    <div className="testimonials__content__item_content_user">
                        <div className="mobile_cust_cont flex items-center gap-x-5">
                            <motion.div className="block aspect-square w-2/12 overflow-hidden  rounded-full lg:hidden">
                                <AnimatePresence exitBeforeEnter>
                                    <motion.img
                                        key={testimonials.indexOf(selectedTestimonial)}
                                        initial={{ opacity: 0 }}
                                        animate={{
                                            opacity: 1,
                                            // x: 0,
                                            transition: {
                                                delay: 0.8,
                                                duration: 0.8,
                                                ease: "easeInOut",
                                            },
                                        }}
                                        exit={{
                                            opacity: 0,
                                            // x: '-100%',
                                            transition: {
                                                // delay: 0.8,
                                                duration: 0.8,
                                                ease: "easeInOut",
                                            },
                                        }}
                                        className="w-full object-cover "
                                        src={selectedTestimonial?.img}
                                        alt="Bitzquad testimonial section"
                                    />
                                </AnimatePresence>
                            </motion.div>
                            <div className="block w-10/12 truncate lg:hidden">
                                <AnimatePresence exitBeforeEnter>
                                    <motion.h5
                                        className="person"
                                        key={testimonials.indexOf(selectedTestimonial)}
                                        variants={contentAnimMobile}
                                        initial="initial"
                                        animate="animate"
                                        exit="exit"
                                    >
                                        {selectedTestimonial?.name}
                                    </motion.h5>
                                </AnimatePresence>
                                <AnimatePresence exitBeforeEnter>
                                    <motion.p
                                        className="role"
                                        key={testimonials.indexOf(selectedTestimonial)}
                                        variants={contentAnimMobile}
                                        initial="initial"
                                        animate="animate"
                                        exit="exit"
                                    >
                                        {selectedTestimonial?.role}
                                    </motion.p>
                                </AnimatePresence>
                            </div>
                        </div>
                        <div className="hidden lg:block">
                            <AnimatePresence exitBeforeEnter>
                                <motion.h5
                                    className="person"
                                    key={testimonials.indexOf(selectedTestimonial)}
                                    variants={contentAnim}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                >
                                    {selectedTestimonial?.name}
                                </motion.h5>
                            </AnimatePresence>
                            <AnimatePresence exitBeforeEnter>
                                <motion.p className="role" key={testimonials.indexOf(selectedTestimonial)} variants={contentAnim} initial="initial" animate="animate" exit="exit">
                                    {selectedTestimonial?.role}
                                </motion.p>
                            </AnimatePresence>
                        </div>
                    </div>
                    <AnimatePresence exitBeforeEnter>
                        <motion.p className="text" key={testimonials.indexOf(selectedTestimonial)} variants={contentAnim} initial="initial" animate="animate" exit="exit">
                            {selectedTestimonial?.text}
                        </motion.p>
                    </AnimatePresence>
                </div>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{
                    opacity: 1,
                    y: 0,
                    transition: {
                        // delay: 0.4,
                        duration: 0.8,
                        ease: "easeInOut",
                    },
                }}
                viewport={{ once: true }}
                className="mx-auto mt-20 flex h-2 gap-x-4 px-5 lg:w-1/3 lg:px-0 "
            >
                {testimonials.map((testimonial, index) => (
                    <motion.button
                        key={index}
                        onClick={() => {
                            setSelectedTestimonial(testimonial);
                        }}
                        className="relative h-full grow  rounded-full bg-gray-200 "
                    >
                        {testimonials.indexOf(selectedTestimonial) === index && (
                            <AnimatePresence exitBeforeEnter>
                                <motion.div
                                    transition={{
                                        type: "spring",
                                        stiffness: 200,
                                        damping: 50,
                                    }}
                                    layoutId="test_tab"
                                    initial={false}
                                    className="absolute top-0  left-0 z-10 h-full w-full rounded-full bg-gray-700"
                                ></motion.div>
                            </AnimatePresence>
                        )}
                    </motion.button>
                ))}
            </motion.div>
        </div>
    );
}

export default CustomerFeedback;
