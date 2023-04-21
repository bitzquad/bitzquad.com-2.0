/*    Imports    */
import Navbar from "../_common/navbar";
import Footer from "../_common/footer";

import Head from "next/head";

const Layout = ({ children }) => {
    return (
        <>
            <Head>
                <link rel="icon" href="./favicon.png"></link>
            </Head>
            <Navbar />
            {children}
            <Footer />
        </>
    );
};

export default Layout;
