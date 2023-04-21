import { StarIcon, LocationMarkerIcon } from "@heroicons/react/solid";
const Component = () => {
    return (
        <>
            <div className={`border rounded-lg px-5 py-4 shadow-md my-4 border-gray-300 animate-pulse`}>
                <div className="inline-flex relative w-full ">
                    <div>
                        <span className="inline-flex items-center mr-2 px-2.5 py-0.5 rounded-sm text-xs font-medium bg-green-100 text-green-800 h-4 w-12"> </span>
                        <span className="inline-flex items-center mr-2 px-2.5 py-0.5 rounded-sm text-xs font-medium bg-cyan-100 text-cyan-800 h-4 w-20"> </span>
                    </div>
                    <div className="w-6 h-6 absolute right-0 rounded-full left-auto bg-gray-300 text-gray-800"></div>
                </div>
                <h3 className="text-gray-800 font-semibold text-xl  bg-gray-300  hover:underline w-52"></h3>
                <p className="text-gray-600 flex flex-row text-sm align-middle">
                    <p className="w-32 my-1 bg-gray-300"></p>
                    <span className="font-semibold ml-4 text-gray-700  inline-flex ">
                        <p className="w-8 my-1 bg-gray-300"></p> <StarIcon className="w-5 h-5 ml-1 text-gray-500" />
                    </span>
                </p>
                <div className="inline-flex text-gray-700 font-medium ">
                    <p className="w-16 my-1 bg-gray-300"></p>
                    <LocationMarkerIcon className="w-5 h-5 text-gray-500 mr-1 ml-4" />
                    <p className="font-normal text-sm text-gray-500 my-1 bg-gray-300  hover:underline w-36 "></p>
                </div>
                <div className="flex flex-row gap-x-3 gap-y-2 flex-wrap mt-1 ">
                    <div className="bg-gray-200 py-1 px-2 rounded-md text-sm">
                        <span className="font-bold text-gray-700 inline-flex align-middle w-20 "></span>
                    </div>
                    <div className="bg-gray-200 py-1 px-2 rounded-md text-sm">
                        <span className="font-bold text-gray-700 inline-flex align-middle w-16 "></span>
                    </div>
                    <div className="bg-gray-200 py-1 px-2 rounded-md text-sm">
                        <span className="font-bold text-gray-700 inline-flex align-middle w-28 a"></span>
                    </div>
                </div>
                <div className="flex flex-row gap-x-3 flex-wrap mt-3">
                    <span className=" text-red-700 inline-flex align-middle text-sm w-24 "></span>
                    <span className=" text-cyan-700 inline-flex align-middle text-sm w-20 "></span>
                </div>
                <div className="inline-flex align-middle gap-x-3 mt-4">
                    <p className="text-gray-500 text-xs my-1 bg-gray-300 h-4 w-36 "></p>
                    <p className="text-orange-500 font-semibold text-xs inline-flex my-1 bg-orange-300 h-4 w-24 "></p>
                    <p className="text-blue-500 font-semibold text-xs inline-flex w-44 my-1 bg-blue-300 h-4 "></p>
                </div>
            </div>
        </>
    );
};
export default Component;
