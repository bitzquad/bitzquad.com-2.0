import { DotsVerticalIcon, StarIcon, BriefcaseIcon, ClockIcon, CashIcon, FireIcon, UserAddIcon, LocationMarkerIcon, StopIcon } from "@heroicons/react/solid";
const Component = ({ job, selected, onClick, onDoubleClick }) => {
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
            <div
                className={`border rounded-lg px-5 py-4 shadow-md my-4 ${selected == true ? "border-indigo-700" : "border-gray-300"}`}
                onClick={onClick}
                onDoubleClick={onDoubleClick}
            >
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

                <h3 className="text-gray-800 font-semibold text-xl hover:cursor-pointer hover:underline">{job?.name}</h3>

                <p className="text-gray-600 flex flex-row text-sm align-middle">
                    {job?.company?.name}
                    <span className="font-semibold ml-4 text-gray-700  inline-flex">
                        2.9 <StarIcon className="w-5 h-5 ml-1 text-gray-500" />
                    </span>
                </p>
                <div className="inline-flex text-gray-700 font-medium">
                    <p>{job?.workplace}</p>
                    <LocationMarkerIcon className="w-5 h-5 text-gray-500 mr-1 ml-4" />
                    <p className="font-normal text-sm text-gray-500  hover:underline">
                        {job?.place?.city}, {job?.place?.state}, {job?.place?.country}
                    </p>
                </div>
                <div className="flex flex-row gap-x-3 gap-y-2 flex-wrap mt-1">
                    <div className="bg-gray-200 py-1 px-2 rounded-md text-sm">
                        <span className="font-bold text-gray-700 inline-flex align-middle">
                            <CashIcon className="w-5 h-5 mr-2" />
                            {job?.salary?.avarage} {job?.salary?.currency} {job?.salary?.timeperiod}
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
                    {job?.urgent == true && (
                        <span className=" text-red-700 inline-flex align-middle text-sm">
                            <ClockIcon className="w-5 h-5 mr-2" /> Urgently hiring
                        </span>
                    )}
                    {job?.candidatescount > 1 && (
                        <span className=" text-cyan-700 inline-flex align-middle text-sm">
                            <UserAddIcon className="w-5 h-5 mr-2" /> Hiring multiple candidates
                        </span>
                    )}
                </div>
                <div className="inline-flex align-middle gap-x-3 mt-4">
                    <p className="text-gray-500 text-xs">posted {getDateDiffString(job?.createdAt)}</p>
                    {job?.vacent == true > 0 && (
                        <p className="text-orange-500 font-semibold text-xs inline-flex animate-pulse">
                            <FireIcon className="w-4 h-4 mr-1 " />
                            Vacent - Hiring inprogress
                        </p>
                    )}
                    {job?.vacent == false > 0 && (
                        <p className="text-blue-500 font-semibold text-xs inline-flex animate-pulse">
                            <StopIcon className="w-4 h-4 mr-1 " />
                            Closed - Position filled
                        </p>
                    )}
                </div>
            </div>
        </>
    );
};
export default Component;
