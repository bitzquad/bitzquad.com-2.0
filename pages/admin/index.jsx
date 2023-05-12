import { useRouter } from "next/router";
import auth from "../../constants/hooks/useAuth";
import { useState } from "react";
import useUserStore from "../../constants/stores/userstore";

import { ArrowRightIcon, PlusCircleIcon } from "@heroicons/react/solid";

const SignIn = (props) => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [loginError, setLoginError] = useState("");

    const user = useUserStore((state) => state);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await auth.signIn(email, password, (load) => setLoading(load));
        if (res.success) {
            user.setUser(res.user);
            router.push(router.query.callback == undefined ? "/admin/dashboard" : router.query.callback);
        } else {
            switch (res.error.type) {
                case "UserNotConfirmedException":
                    router.push(`/auth/verify?email=${email}`);
                    break;
                default:
                    console.log("error : ", res.error);
                    setLoginError(res.error.message);
                    break;
            }
        }
    };
    return (
        <div className="mt-10 flex flex-col bg-white px-8 md:py-10 lg:mt-24 lg:flex-row">
            {/* Picture  */}
            <div className="w-full px-0 lg:w-1/2 xl:px-12">
                <img className="h-full w-full object-contain" src="/logo-dark.webp" alt="" />
            </div>
            {/* Form  */}
            <div className="mt-10 w-full px-0 lg:mt-0 lg:w-1/2 xl:px-12">
                <div className="md:ml-auto md:px-8 lg:px-16">
                    <h2 className="text-lg font-semibold text-gray-500">Bitzquad</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Sign in to your account</p>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                                Email address
                            </label>
                            <div className="mt-1">
                                <input id="email" name="email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="block w-full appearance-none rounded-md border px-3  py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                                Password
                            </label>
                            <div className="mt-1">
                                <input id="password" name="password" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" />
                            </div>
                            {loginError == "" ? <></> : <span className="pt-1 pl-1 font-medium text-red-400">{loginError}</span>}
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 cursor-pointer rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <a onClick={() => router.push("/auth/forgotpassword")} className="cursor-pointer font-medium text-indigo-500 hover:text-indigo-700">
                                    Forgot your password?
                                </a>
                            </div>
                        </div>

                        <div>
                            <div className="flex w-full flex-col justify-between gap-x-5 align-middle lg:flex-row">
                                <button disabled={loading} type="submit" className="inline-flex w-auto items-center justify-center rounded-md border border-transparent bg-indigo-500 px-5 py-3 text-base font-medium text-white shadow hover:bg-indigo-600">
                                    Sign in
                                    {loading ? <PlusCircleIcon className="-mr-1 ml-3 h-5 w-5 animate-spin text-white" /> : <ArrowRightIcon className="-mr-1 ml-3 h-5 w-5 text-white" aria-hidden="true" />}
                                </button>

                                <div className="w-auto pt-4 text-justify text-sm">
                                    Don&apos;t have an account?{" "}
                                    <a onClick={() => router.push("/auth/signup")} className="cursor-pointer font-medium text-indigo-500 hover:text-indigo-700">
                                        Sign Up
                                    </a>
                                </div>
                            </div>
                            {/* <div className="flex flex-row justify-between">
                <div className="border-b border-gray-500 w-full"></div>
                <span className="text-gray-600 translate-y-2 w-auto mx-3">
                  or
                </span>
                <div className="border-b border-gray-500 w-full"></div>
              </div> */}

                            {/* <button
                type="button"
                className="text-gray-600 mt-5 text-base inline-flex justify-center bg-white w-full hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg px-5 py-2.5 text-center items-center dark:focus:ring-gray-800 dark:bg-white dark:border-gray-700 dark:text-gray-900 dark:hover:bg-gray-200 mr-2 mb-2"
              >
                <img
                  layout="fill"
                  height="20"
                  width="20"
                  src={GoogleIcon.src}
                  alt="Google signup image"
                />
                <span className="ml-2">Sign in with Google</span>
              </button> */}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default SignIn;

SignIn.layout = "main";
