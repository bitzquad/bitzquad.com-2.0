import { DotsVerticalIcon, StarIcon, BriefcaseIcon, ClockIcon, CashIcon, FireIcon, UserAddIcon, HeartIcon, LocationMarkerIcon, StopIcon } from "@heroicons/react/solid";
import ReactHtmlParser from "react-html-parser";
import Link from "next/link";

const Component = ({ job, loading }) => {
    const getDateDiffString = (date) => {
        const diff = new Date() - new Date(date);
        const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
        const diffHours = Math.floor(diff / (1000 * 60 * 60));
        const diffMinutes = Math.floor(diff / (1000 * 60));
        if (diffDays > 0) {
            return `${diffDays} days ago`;
        } else if (diffHours > 0) {
            return `${diffHours} hours ago`;
        } else if (diffMinutes > 0) {
            return `${diffMinutes} minutes ago`;
        } else {
            return "just now";
        }
    };
    const IsNew = (date) => {
        return new Date() - new Date(date) / (1000 * 60 * 60) < 36;
    };
    return (
        <>
            <div className="border border-gray-300 rounded-lg px-5 py-4 shadow-md my-4">
                {loading == true && (
                    <div className="absolute z-20 bottom-0 top-0 left-0 right-0 bg-gray-50 border border-gray-300 rounded-lg px-5 py-4 shadow-md my-4 flex justify-center align-middle">
                        <h3 className="text-gray-800 font-bold text-xl">Loading</h3>
                    </div>
                )}
                {(job == undefined || job == null) && (
                    <div className="absolute z-20 bottom-0 top-0 left-0 right-0 bg-gray-50 border border-gray-300 rounded-lg px-5 py-4 shadow-md my-4 flex justify-center align-middle">
                        <h3 className="text-gray-800 font-bold text-xl">Select Post to View Details</h3>
                    </div>
                )}
                <div className="flex relative w-full">
                    <div>
                        {IsNew(job?.createdAt) && (
                            <span className="inline-flex items-center mr-2 px-2.5 py-0.5 rounded-sm text-xs font-medium bg-green-100 text-green-800"> New </span>
                        )}
                        {job?.featured == true && (
                            <span className="inline-flex items-center mr-2 px-2.5 py-0.5 rounded-sm text-xs font-medium bg-cyan-100 text-cyan-800"> Featured </span>
                        )}
                    </div>
                    <DotsVerticalIcon className="w-5 h-5 absolute right-0 left-auto text-gray-800" />
                </div>
                <Link href={`/job/${job?._id}`}>
                    <h3 className="text-gray-800 font-bold text-xl hover:underline">{job?.name}</h3>
                </Link>
                <p className="text-gray-600 flex flex-row text-base align-middle">
                    <span className=" hover:underline">{job?.company?.name}</span>
                    <span className="font-semibold ml-4 text-gray-700  inline-flex">
                        2.9{" "}
                        <span className="inline-flex mt-0.5">
                            <StarIcon className="w-5 h-5 ml-1 text-yellow-500" />
                            <StarIcon className="w-5 h-5 ml-0.5 text-yellow-500" />
                            <StarIcon className="w-5 h-5 ml-0.5 text-yellow-500" />
                            <StarIcon className="w-5 h-5 ml-0.5 text-gray-500" />
                            <StarIcon className="w-5 h-5 ml-0.5 text-gray-500" />
                        </span>
                    </span>
                    <span className="ml-2 hover:underline text-blue-700">21 Reviews</span>
                </p>
                <div className="inline-flex text-gray-700 font-medium">
                    <p>{job?.worktype}</p>
                    <LocationMarkerIcon className="w-5 h-5 text-gray-500 mr-1 ml-4" />
                    <p className="font-medium text-sm text-gray-500  hover:underline">
                        {job?.place?.city}, {job?.place?.state}, {job?.place?.country}
                    </p>
                </div>
                <div className="flex flex-row gap-x-3 flex-wrap mt-1">
                    <div className="bg-gray-200 py-1 px-2 rounded-md text-sm">
                        <span className="font-bold text-gray-700 inline-flex align-middle">
                            <CashIcon className="w-5 h-5 mr-2" /> {job?.salary?.avarage} {job?.salary?.currency} {job?.salary?.timeperiod}
                        </span>
                    </div>
                    <div className="bg-gray-200 py-1 px-2 rounded-md text-sm">
                        <span className="font-bold text-gray-700 inline-flex align-middle">
                            <BriefcaseIcon className="w-5 h-5 mr-2" /> {job?.jobtype}
                        </span>
                    </div>
                    {/* <div className="bg-gray-200 py-1 px-2 rounded-md text-sm">
                        <span className="font-bold text-gray-700 inline-flex align-middle">
                            <ClockIcon className="w-5 h-5 mr-2 " /> 9 AM - 5PM
                        </span>
                    </div> */}
                </div>
                <div className="flex flex-row gap-x-3 flex-wrap mt-3">
                    {job?.vacent == true > 0 && (
                        <span className="text-orange-500 inline-flex align-middle text-sm animate-pulse">
                            <FireIcon className="w-5 h-5 mr-2" /> Vacent - Hiring inprogress
                        </span>
                    )}
                    {job?.vacent == false > 0 && (
                        <span className="text-blue-500 inline-flex align-middle text-sm animate-pulse">
                            <StopIcon className="w-5 h-5 mr-2 " />
                            Closed - Position filled
                        </span>
                    )}
                    {job?.urgent == true && (
                        <span className=" text-red-700 inline-flex align-middle text-sm animate-pulse">
                            <ClockIcon className="w-5 h-5 mr-2" /> Urgently hiring
                        </span>
                    )}
                    {job?.candidatescount > 1 && (
                        <span className="text-cyan-700 inline-flex align-middle text-sm animate-pulse">
                            <UserAddIcon className="w-5 h-5 mr-2" /> Hiring multiple candidates
                        </span>
                    )}
                </div>
                <div className="border-b border-gray-300 my-3 -mx-5"></div>
                <div className="flex flex-row gap-x-3 flex-wrap">
                    <a
                        className={`whitespace-nowrap inline-flex items-center justify-center px-4 py-1.5 border border-transparent rounded-md shadow-sm text-base font-medium text-white  hover:bg-green-700 ${
                            job?.vacent == false ? "pointer-events-none disabled bg-gray-300 text-gray-700" : "cursor-pointer bg-green-600"
                        }`}
                        href={job?.registration?.formurl || ""}
                        target="_blank"
                        rel="noreferrer"
                    >
                        Apply now
                    </a>

                    {/* <button className=" cursor-pointer whitespace-nowrap inline-flex items-center justify-center px-3 py-1.5 border border-transparent rounded-md shadow-sm text-base font-medium text-gray-700 bg-gray-300 hover:bg-gray-400">
                        <HeartIcon className="w-5 h-5" />
                    </button> */}
                </div>
                <div className="border-b border-gray-300 my-3 -mx-5"></div>
                <h4 className="text-gray-800 font-semibold text-xl">Job details</h4>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="text-gray-700 mt-3 text-sm">
                        <strong>Salary</strong>
                        <p>
                            {job?.salary?.avarage} {job?.salary?.currency} {job?.salary?.timeperiod}
                        </p>
                    </div>
                    <div className="text-gray-700 mt-3 text-sm">
                        <strong>Job Type</strong>
                        <p>{job?.jobtype}</p>
                    </div>
                    <div className="text-gray-700 mt-3 text-sm">
                        <strong>Job Category</strong>
                        <p>{job?.category}</p>
                    </div>
                    <div className="text-gray-700 mt-3 text-sm">
                        <strong>Job Industry</strong>
                        <p>{job?.industry}</p>
                    </div>
                    <div className="text-gray-700 mt-3 text-sm">
                        <strong>Job Seniority</strong>
                        <p>{job?.seniority}</p>
                    </div>
                    <div className="text-gray-700 mt-3 text-sm">
                        <strong>Min Experience</strong>
                        <p>{job?.experience}</p>
                    </div>
                    <div className="text-gray-700 mt-3 text-sm">
                        <strong>Min Education</strong>
                        <p>{job?.education}</p>
                    </div>
                </div>
                <div className="border-b border-gray-300 my-3 -mx-5"></div>
                <h4 className="text-gray-800 font-semibold text-xl">Job description</h4>
                <div className="text-gray-700 mt-3 text-sm">
                    <p>{job?.description}</p>
                </div>
                <div className="border-b border-gray-300 my-3 -mx-5"></div>
                <h4 className="text-gray-800 font-semibold text-xl">More details</h4>
                <div className="text-gray-700 mt-3 text-sm">
                    <span>{ReactHtmlParser(job?.content)}</span>
                </div>
                <div className="border-b border-gray-300 my-3 -mx-5"></div>
                <h4 className="text-gray-800 font-semibold text-xl">Insights</h4>
                <div className="text-gray-500 mt-3 text-sm inline-flex w-full">
                    <UserAddIcon className="w-5 h-5 mr-4" />
                    <p>Hiring {job?.candidatescount} candidate for this position</p>
                </div>
                <div className="inline-flex align-middle gap-x-3 mt-4">
                    <p className="text-gray-500 text-xs">posted {getDateDiffString(job?.createdAt)}</p>
                </div>
            </div>
        </>
    );
};
export default Component;
