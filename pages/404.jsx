import Meta from "../components/_common/meta";
import { useRouter } from "next/router";
const FOF = () => {
    const router = useRouter();
    return (
        <div className="min-h-full bg-white px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
            <Meta
                title="Bitzquad | Page Not Found"
                description="We are a team of thinkers, engineers, designers, and marketers who represent different cultures worldwide, working together to build better solutions
                            for a better world.  We strive to provide sustaining digital solutions in Information Systems, Business Process Re-engineering, Branding and Digital Marketing, and
                            E-Business services that serve our stakeholders' best interests."
                keywords="Bitzquad, Solutions Beyond Technology, Software Company, Information Systems, Business Process Re-engineering, Branding, Digital Marketing, E-Business services"
                url={`${process.env.NEXT_PUBLIC_API_URL}${router.asPath}`}
                imagefb={`${process.env.NEXT_PUBLIC_API_URL}/og-img.webp`}
                alt="We are a team of thinkers, engineers, designers, and marketers who represent different cultures worldwide, working together to build better solutions
                    for a better world.  We strive to provide sustaining digital solutions in Information Systems, Business Process Re-engineering, Branding and Digital Marketing, and
                    E-Business services that serve our stakeholders' best interests."
            />
            <div className="mx-auto max-w-max">
                <main className="sm:flex">
                    <p className="text-4xl font-bold tracking-tight text-indigo-600 sm:text-5xl">404</p>
                    <div className="sm:ml-6">
                        <div className="sm:border-l sm:border-gray-200 sm:pl-6">
                            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Page not found</h1>
                            <p className="mt-1 text-base text-gray-500">Please check the URL in the address bar and try again.</p>
                        </div>
                        <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
                            <a href="/" className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                Go back home
                            </a>
                            <a href="/contact" className="inline-flex items-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                Contact support
                            </a>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};
export default FOF;
