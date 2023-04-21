/*    Imports    */
import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition, Disclosure } from "@headlessui/react";
import { XIcon, MenuIcon, ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { getMenu } from "../../constants/hooks/getMenu";
import useUserStore from "../../constants/stores/userstore";
import EUsertype from "../../types/enum/_common/EUsertype";
import fetcher from "../../constants/fetch/user";

const permittedTypes = [EUsertype.verified, EUsertype.pro, EUsertype.blogwriter, EUsertype.blogadmin, EUsertype.newswriter, EUsertype.newsadmin, EUsertype.blognewsadmin, EUsertype.admin, EUsertype.superadmin];

const Layout = ({ children }) => {
    const router = useRouter();

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [sidebarCollapse, setSidebarCollapse] = useState(false);

    const [loading, setLoading] = useState(false);

    const user = useUserStore((state) => state);

    useEffect(() => {
        getCurrentUserFromCookie();
    }, []);

    const getCurrentUserFromCookie = async () => {
        if (!user.value) {
            const usr = await fetcher.getMyInfo(setLoading);
            if (usr) {
                user.setUser({ ...usr, id: usr._id });
            }
        }
    };

    const navigation = getMenu();

    for (let i = 0; i < navigation.length; i++) {
        if (router.asPath.includes(navigation[i].base)) navigation[i].current = true;
        else navigation[i].current = false;
    }
    function classNames(...classes) {
        return classes.filter(Boolean).join(" ");
    }
    return (
        <>
            <div>
                <Head>
                    <link rel="icon" href="./favicon.png"></link>
                </Head>
                <Transition.Root show={sidebarOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-40 md:hidden" onClose={setSidebarOpen}>
                        <Transition.Child as={Fragment} enter="transition-opacity ease-linear duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="transition-opacity ease-linear duration-300" leaveFrom="opacity-100" leaveTo="opacity-0">
                            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
                        </Transition.Child>

                        <div className="fixed inset-0 z-40 flex">
                            <Transition.Child as={Fragment} enter="transition ease-in-out duration-300 transform" enterFrom="-translate-x-full" enterTo="translate-x-0" leave="transition ease-in-out duration-300 transform" leaveFrom="translate-x-0" leaveTo="-translate-x-full">
                                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white">
                                    <Transition.Child as={Fragment} enter="ease-in-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in-out duration-300" leaveFrom="opacity-100" leaveTo="opacity-0">
                                        <div className="absolute top-0 right-0 -mr-12 pt-2">
                                            <button type="button" className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" onClick={() => setSidebarOpen(false)}>
                                                <span className="sr-only">Close sidebar</span>
                                                <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                            </button>
                                        </div>
                                    </Transition.Child>
                                    <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
                                        <div className="flex flex-shrink-0 items-center justify-center px-4" onClick={() => router.push("/")}>
                                            <img className="h-8 w-auto" src="./public/logo-dark.webp" alt="Workflow" />
                                        </div>
                                        <nav className="mt-5 space-y-1 px-2">
                                            {navigation.map((item) =>
                                                !item.children || item.children.length == 0 ? (
                                                    <div key={item.name}>
                                                        <a
                                                            onClick={() => {
                                                                router.push(item.base);
                                                            }}
                                                            className={classNames(item.current ? "bg-gray-100 text-gray-900" : "bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900", "group flex w-full items-center rounded-md py-3 px-3 text-sm font-medium")}
                                                        >
                                                            <item.icon className={classNames(item.current ? "text-gray-500" : "text-gray-400 group-hover:text-gray-500", "mr-5 h-6 w-6 flex-shrink-0")} aria-hidden="true" />
                                                            {item.name}
                                                        </a>
                                                    </div>
                                                ) : (
                                                    <Disclosure as="div" key={item.name} className="space-y-1">
                                                        {({ open }) => (
                                                            <>
                                                                <Disclosure.Button className={classNames(item.current ? "bg-gray-100 text-gray-900" : "bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900", "group flex w-full items-center rounded-md py-3 px-3 text-left text-sm font-medium")}>
                                                                    <item.icon className="mr-5 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                                                                    <span className="flex-1">{item.name}</span>
                                                                    <svg className={classNames(open ? "rotate-90 text-gray-400" : "text-gray-300", "ml-3 h-5 w-5 flex-shrink-0 transform transition-colors duration-150 ease-in-out group-hover:text-gray-400")} viewBox="0 0 20 20" aria-hidden="true">
                                                                        <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
                                                                    </svg>
                                                                </Disclosure.Button>
                                                                <Disclosure.Panel className="space-y-1">
                                                                    {item.children.map((subItem, index) => (
                                                                        <Disclosure.Button
                                                                            key={subItem.name}
                                                                            as="a"
                                                                            onClick={() => {
                                                                                router.push(subItem.href ? subItem.href : `${item.base}?tab=${index}`);
                                                                            }}
                                                                            className="group flex w-full items-center rounded-md py-2 pl-14 pr-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                                                        >
                                                                            {subItem.name}
                                                                        </Disclosure.Button>
                                                                    ))}
                                                                </Disclosure.Panel>
                                                            </>
                                                        )}
                                                    </Disclosure>
                                                )
                                            )}
                                        </nav>
                                    </div>
                                    <div className="flex flex-shrink-0 border-t border-gray-200 p-4">
                                        <a href="#" className="group block flex-shrink-0">
                                            <div className="flex items-center">
                                                <div>
                                                    <img className="inline-block h-10 w-10 rounded-full" src={user.value ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${user.value?.id}?key=${user.value?.thumbnail?.src}` : ""} alt={user.value?.name?.first} />
                                                </div>
                                                <div className="ml-3">
                                                    <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                                                        {user.value?.name?.first} {user.value?.name?.last}
                                                    </p>
                                                    <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">{user.value?.email}</p>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                            <div className="w-14 flex-shrink-0">{/* Force sidebar to shrink to fit close icon */}</div>
                        </div>
                    </Dialog>
                </Transition.Root>

                {/* Static sidebar for desktop */}
                <div className={`hidden md:fixed md:inset-y-0 md:flex md:flex-col ${sidebarCollapse ? "z-10 w-16 hover:w-64 hover:shadow-xl" : "md:w-64"}`}>
                    <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white">
                        <div className="flex flex-1 flex-col overflow-x-hidden pt-5 pb-4">
                            <div className="flex flex-shrink-0 items-center justify-center px-4">
                                <img className="h-8 w-auto" src={sidebarCollapse ? "./public/logo.webp" : "./public/logo-dark.webp"} alt="Workflow" onClick={() => router.push("/")} />
                                {sidebarCollapse ? <ArrowRightIcon className="absolute -right-4 h-8 w-8 rounded-full border border-gray-200 bg-white p-1 text-gray-500 hover:text-gray-700" aria-hidden="true" onClick={() => setSidebarCollapse(false)} /> : <ArrowLeftIcon className="absolute -right-4 h-8 w-8 rounded-full border border-gray-200 bg-white p-1 text-gray-500 hover:text-gray-700" aria-hidden="true" onClick={() => setSidebarCollapse(true)} />}
                            </div>
                            <nav className="mt-8 flex-1 space-y-1 overflow-y-auto overflow-x-hidden bg-white px-2" aria-label="Sidebar">
                                {navigation.map((item) =>
                                    !item.children || item.children.length == 0 ? (
                                        <div key={item.name}>
                                            <a
                                                onClick={() => {
                                                    router.push(item.base);
                                                }}
                                                className={classNames(item.current ? "bg-gray-100 text-gray-900" : "bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900", "group flex w-full items-center rounded-md py-3 px-3 text-sm font-medium")}
                                            >
                                                <item.icon className={classNames(item.current ? "text-gray-500" : "text-gray-400 group-hover:text-gray-500", "mr-5 h-6 w-6 flex-shrink-0")} aria-hidden="true" />
                                                {item.name}
                                            </a>
                                        </div>
                                    ) : (
                                        <Disclosure as="div" key={item.name} className="space-y-1">
                                            {({ open }) => (
                                                <>
                                                    <Disclosure.Button className={classNames(item.current ? "bg-gray-100 text-gray-900" : "bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900", "group flex w-full items-center rounded-md py-3 px-3 text-left text-sm font-medium")}>
                                                        <item.icon className="mr-5 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                                                        <span className="flex-1">{item.name}</span>
                                                        <svg className={classNames(open ? "rotate-90 text-gray-400" : "text-gray-300", "ml-3 h-5 w-5 flex-shrink-0 transform transition-colors duration-150 ease-in-out group-hover:text-gray-400")} viewBox="0 0 20 20" aria-hidden="true">
                                                            <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
                                                        </svg>
                                                    </Disclosure.Button>
                                                    <Disclosure.Panel className="space-y-1">
                                                        {item.children.map((subItem, index) => (
                                                            <button
                                                                key={subItem.name}
                                                                as="a"
                                                                onClick={() => {
                                                                    router.push(subItem.href ? subItem.href : `${item.base}?tab=${index}`);
                                                                }}
                                                                className="group flex w-full items-center rounded-md py-2 pl-14 pr-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                                            >
                                                                {subItem.name}
                                                            </button>
                                                        ))}
                                                    </Disclosure.Panel>
                                                </>
                                            )}
                                        </Disclosure>
                                    )
                                )}
                            </nav>
                        </div>
                        <div className="flex flex-shrink-0 border-t border-gray-200 p-3">
                            <a href="#" className="group block w-full flex-shrink-0">
                                <div className="flex items-center">
                                    <div>
                                        <img className="inline-block h-9 w-9 rounded-full" src={user.value ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${user.value?.id}?key=${user.value?.thumbnail?.src}` : ""} alt={user.value?.name?.first} />
                                    </div>
                                    <div className={`ml-3 ${sidebarCollapse ? "hidden" : ""}`}>
                                        <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                                            {user.value?.name?.first} {user.value?.name?.last}
                                        </p>
                                        <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">{user.value?.email}</p>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className={`flex flex-1 flex-col ${sidebarCollapse ? "md:pl-16" : "md:pl-64"}`}>
                    <div className="absolute top-0 right-0 z-10 bg-white pl-1 pt-1 sm:pl-3 sm:pt-3 md:hidden">
                        <button type="button" className="mr-3 mt-3 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" onClick={() => setSidebarOpen(true)}>
                            <span className="sr-only">Open sidebar</span>
                            <MenuIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    {user.value && permittedTypes.includes(user.value.status) ? (
                        <div>{children}</div>
                    ) : (
                        <div className="min-h-full bg-white px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
                            <div className="mx-auto max-w-max">
                                <main className="sm:flex">
                                    <p className="text-4xl font-bold tracking-tight text-indigo-600 sm:text-5xl sm:tracking-tight">401</p>
                                    <div className="sm:ml-6">
                                        <div className="sm:border-l sm:border-gray-200 sm:pl-6">
                                            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl sm:tracking-tight">Unauthorized!</h1>
                                            <p className="mt-1 text-base text-gray-500">You don&apos;t have permission to view requested content. Try signin to system.</p>
                                        </div>
                                        <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
                                            <Link href="/">
                                                <div className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Go back home</div>
                                            </Link>
                                            <Link href="/auth/signin">
                                                <div className="inline-flex items-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Sign In</div>
                                            </Link>
                                        </div>
                                    </div>
                                </main>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Layout;
