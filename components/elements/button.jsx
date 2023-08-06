import { motion } from "framer-motion";
import Link from "next/link";

function Button({ children, className, parentClassName, href }) {
    return (
        <motion.div className={`p-5 ${parentClassName}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, ease: "easeInOut" }}>
            <Link href={href || ""}>
                <motion.button
                    whileHover={{ scale: 1.07 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    data-cursor-text="click"
                    className={`relative overflow-hidden rounded-full border-2 border-purple-700 px-5 py-3 text-xl sm:px-10 sm:py-4   ${className}`}
                >
                    {/* <motion.div className="absolute bottom-0 left-0 top-0 right-0 h-full w-full bg-green-400 "></motion.div> */}
                    <span>{children}</span>
                </motion.button>
            </Link>
        </motion.div>
    );
}

export default Button;
