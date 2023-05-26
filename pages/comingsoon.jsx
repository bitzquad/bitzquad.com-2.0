import { ChevronRightIcon } from "@heroicons/react/solid";
import { PhoneIcon, InformationCircleIcon, UserGroupIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { Footer } from "../components";
import Meta from "../components/_common/meta";
import { useRouter } from "next/router";
const links = [
    {
        title: "Contact",
        description: "Learn how to integrate our tools with your app",
        href: "/contact",
        icon: PhoneIcon,
    },
    {
        title: "About",
        description: "A complete API reference for our libraries",
        href: "/about",
        icon: InformationCircleIcon,
    },
    {
        title: "Our Team",
        description: "Installation guides that cover popular setups",
        href: "/squad",
        icon: UserGroupIcon,
    },
];

export default function Soon() {
    const router = useRouter();
    return (
        <div className="bg-white">
            <Meta
                title="Bitzquad | Solutions Beyond Technology | Software Company"
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
            <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex-shrink-0 pt-16">
                    <img className="mx-auto h-28 w-auto" src="/logo-dark.webp" alt="Bitzquad - Software Compnay - Logo Dark" />
                </div>
                <div className="mx-auto max-w-xl pb-24 pt-10 sm:pb-24">
                    <div className="text-center">
                        <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Coming Soon...</h1>
                        <p className="mt-2 text-lg text-gray-500">The page you are looking for will be published soon.</p>
                    </div>
                    <div className="mt-12">
                        <h2 className="text-base font-semibold text-gray-500">Popular pages</h2>
                        <ul role="list" className="mt-4 divide-y divide-gray-200 border-b border-t border-gray-200">
                            {links.map((link, linkIdx) => (
                                <li key={linkIdx} className="relative flex items-start space-x-4 py-6">
                                    <div className="flex-shrink-0">
                                        <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-50">
                                            <link.icon className="h-6 w-6 text-indigo-700" aria-hidden="true" />
                                        </span>
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <h3 className="text-base font-medium text-gray-900">
                                            <span className="rounded-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2">
                                                <a href={link.href} className="focus:outline-none">
                                                    <span className="absolute inset-0" aria-hidden="true" />
                                                    {link.title}
                                                </a>
                                            </span>
                                        </h3>
                                        <p className="text-base text-gray-500">{link.description}</p>
                                    </div>
                                    <div className="flex-shrink-0 self-center">
                                        <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-8">
                            <Link href="/">
                                <p className="text-base font-medium text-indigo-600 hover:text-indigo-500">
                                    Or go back home
                                    <span aria-hidden="true"> &rarr;</span>
                                </p>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
            <Footer></Footer>
        </div>
    );
}
