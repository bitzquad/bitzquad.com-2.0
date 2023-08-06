import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";
import { LayoutSubPages } from "../../components";

import { MailIcon, PhoneIcon, LocationMarkerIcon, ArrowRightIcon, CheckIcon } from "@heroicons/react/outline";

import { motion } from "framer-motion";

import Meta from "../../components/_common/meta";
import { useRouter } from "next/router";

import contact from "../../constants/fetch/contact";
const Index = () => {
    const router = useRouter();
    const [Name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [Msg, setMsg] = useState("");

    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await contact.create({ name: { first: Name }, email: Email, message: Msg }, false, setLoading);
        setShowSuccess(res != null);
        setShowError(res == null);
        setName("");
        setEmail("");
        setMsg("");
    };

    return (
        <>
            <LayoutSubPages>
                <Meta title="Bitzquad | Contact Us" description="Want to inquire about your new project or get to know us better? Contact us directly or write to us." keywords="Bitzquad, Contact Bitzquad,  Solutions Beyond Technology, Software Company, Information Systems, Business Process Re-engineering, Branding, Digital Marketing, E-Business services" url={`${process.env.NEXT_PUBLIC_API_URL}${router.asPath}`} imagefb={`${process.env.NEXT_PUBLIC_API_URL}/og-img.webp`} alt="Want to inquire about your new project or get to know us better? Contact us directly or write to us." />
                <div data-scroll-section>
                    <img src="/assets/img/contact/bg-sm.svg" className="absolute left-0 right-0 block w-full -translate-y-28 md:hidden" />

                    <div className="bz-container relative mx-auto mt-0 h-full w-full bg-transparent lg:mt-44">
                        <div className="mx-0 py-10 md:mx-5  lg:py-0">
                            <h1 className="text-3xl font-semibold uppercase lg:text-5xl">CONTACT US</h1>
                            <p className="mt-4 text-sm tracking-widest text-gray-700 lg:mt-5 lg:text-xl xl:w-8/12">
                                Here you are!<br></br>
                                It was well worth the wait. Let&lsquo;s get started.
                                <br></br>
                                <br></br>
                                Want to inquire about your new project or get to know us better?
                                <br></br>
                                Contact us directly or write to us.
                            </p>
                            <div className="mt-3 hidden flex-row flex-wrap gap-x-7 gap-y-4 px-14 pb-5 text-center text-lg font-bold text-main-900 sm:w-10/12 sm:gap-y-2.5  sm:px-0 md:flex">
                                <motion.a href="https://www.facebook.com/bitzquad" target="_blank" rel="noreferrer" className="underline-link" whileHover={{ scale: 1.05 }} transition={{ duration: 0.4, ease: [0.65, 0.05, 0.36, 1] }}>
                                    Facebook
                                </motion.a>
                                <motion.a href="https://twitter.com/Bitzquad" target="_blank" rel="noreferrer" className="underline-link" whileHover={{ scale: 1.05 }} transition={{ duration: 0.4, ease: [0.65, 0.05, 0.36, 1] }}>
                                    Twitter
                                </motion.a>
                                <motion.a href="https://www.instagram.com/bitzquad/" target="_blank" rel="noreferrer" className="underline-link" whileHover={{ scale: 1.05 }} transition={{ duration: 0.4, ease: [0.65, 0.05, 0.36, 1] }}>
                                    Instagram
                                </motion.a>
                                <motion.a href="https://www.linkedin.com/company/bitzquad/" target="_blank" rel="noreferrer" className="underline-link" whileHover={{ scale: 1.05 }} transition={{ duration: 0.4, ease: [0.65, 0.05, 0.36, 1] }}>
                                    LinkedIn
                                </motion.a>
                            </div>
                        </div>
                    </div>
                    <div className=" relative mb-20 mt-0 bg-transparent px-0 md:bg-white lg:mb-0">
                        <img src="/assets/img/contact/bg.svg" className=" absolute left-0 top-0 hidden w-full md:block " />
                        <div className="bz-container relative mb-0 mt-5 max-w-7xl px-5 md:px-10 md:pt-20 lg:py-20">
                            <div className="mx-0 flex h-full flex-row  md:mx-5">
                                <div className="w-full p-0 sm:w-1/2 md:pr-8">
                                    <form className="flex flex-col" onSubmit={handleSubmit}>
                                        <h1 className="text-xl font-semibold uppercase lg:text-3xl">Get In Touch</h1>
                                        <input value={Name} onChange={(e) => setName(e.target.value)} className="mt-5 w-full rounded-none border border-gray-400 px-5 py-3 text-base leading-6 placeholder-gray-500 focus:border-gray-500 focus:placeholder-gray-400 focus:outline-none" type="text" placeholder="Your Name" required />
                                        <input value={Email} onChange={(e) => setEmail(e.target.value)} className="mt-5 w-full rounded-none border border-gray-400  px-5 py-3 text-base leading-6 placeholder-gray-500 focus:border-gray-500 focus:placeholder-gray-400 focus:outline-none" type="email" placeholder="Your Email Address" required />
                                        <textarea value={Msg} onChange={(e) => setMsg(e.target.value)} className="mt-5 w-full rounded-none border border-gray-400  px-5 py-3 text-base leading-6 placeholder-gray-500 focus:border-gray-500 focus:placeholder-gray-400 focus:outline-none" placeholder="Message" rows={7} required />
                                        <div className="flex w-full items-center justify-center">
                                            <motion.button
                                                type="submit"
                                                className="focus:shadow-outline mt-4 flex flex-row rounded-full bg-purple-500 px-5 py-3 text-base leading-6 text-white hover:bg-purple-600 focus:outline-none"
                                                whileHover={{ scale: 1.05 }}
                                                transition={{
                                                    duration: 0.4,
                                                    ease: [0.65, 0.05, 0.36, 1],
                                                }}
                                            >
                                                Send Message <ArrowRightIcon className="ml-2 h-6" />
                                            </motion.button>
                                        </div>
                                    </form>
                                </div>
                                <div className="mb-0 hidden w-full border-l border-gray-400 sm:w-1/2 md:block lg:mb-56">
                                    <div className="flex h-full flex-col justify-center gap-y-4 pl-8 text-base">
                                        <motion.div
                                            className="felx-col flex "
                                            whileHover={{ scale: 1.05 }}
                                            transition={{
                                                duration: 0.4,
                                                ease: [0.65, 0.05, 0.36, 1],
                                            }}
                                        >
                                            <PhoneIcon className="mr-2 h-5 w-5  text-purple-600" />
                                            <a href="tel:+94778813384" className="underline-link">
                                                +94778813384
                                            </a>
                                        </motion.div>
                                        <motion.div
                                            className="felx-col flex "
                                            whileHover={{ scale: 1.05 }}
                                            transition={{
                                                duration: 0.4,
                                                ease: [0.65, 0.05, 0.36, 1],
                                            }}
                                        >
                                            <MailIcon className="mr-2 h-5 w-5  text-purple-600" />
                                            <a href="mailto:hello@bitzquad.com" className="underline-link">
                                                hello@bitzquad.com
                                            </a>
                                        </motion.div>
                                        <motion.div
                                            className="felx-col flex"
                                            whileHover={{ scale: 1.05 }}
                                            transition={{
                                                duration: 0.4,
                                                ease: [0.65, 0.05, 0.36, 1],
                                            }}
                                        >
                                            <LocationMarkerIcon className="mr-2 h-5 w-5 text-purple-600" />
                                            <a href="https://www.google.com/maps/place/BZ+Consulting/@-6.2147,106.845,17z/data=!3m1!4b1!4m5!3m4!1s0x2e69f0f8f8f8f8f8f:0x2e69f0f8f8f8f8f8f!8m2!3d-6.2147!4d106.847" className="underline-link" target="_blank" rel="noreferrer">
                                                275/2 Katuwana Road, Homagama,<br></br> Colombo, Sri Lanka 10200
                                            </a>
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutSubPages>
            <Transition.Root show={showSuccess} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setShowSuccess}>
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enterTo="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 translate-y-0 sm:scale-100" leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                                    <div>
                                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                                            <CheckIcon className="h-6 w-6 text-gray-600" aria-hidden="true" />
                                        </div>
                                        <div className="mt-3 text-center sm:mt-5">
                                            <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                                Details Sent!
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">One of our team member will contact you within 24 hours.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-5 sm:mt-6">
                                        <button disabled={loading} type="button" className="inline-flex w-full justify-center rounded-md border border-transparent bg-black px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 sm:text-sm" onClick={() => setShowSuccess(false)}>
                                            Done
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
            <Transition.Root show={showError} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setShowError}>
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enterTo="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 translate-y-0 sm:scale-100" leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                                    <div>
                                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                                            <CheckIcon className="h-6 w-6 text-gray-600" aria-hidden="true" />
                                        </div>
                                        <div className="mt-3 text-center sm:mt-5">
                                            <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                                Failed To Send Details!
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">Make sure you have a proper internet connection and try again.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-5 sm:mt-6">
                                        <button disabled={loading} type="button" className="inline-flex w-full justify-center rounded-md border border-transparent bg-black px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2 sm:text-sm" onClick={() => setShowError(false)}>
                                            Got it
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    );
};

export default Index;
