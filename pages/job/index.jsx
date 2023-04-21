/*    Imports    */
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";

import fetcher from "../../constants/fetch/job";
import collectionfetcher from "../../constants/fetch/collection";

import SingleJobCard from "../../components/jobs/singlejobinfoview";
import SingleJobCardLoading from "../../components/jobs/singlejobinfoviewloading";
import SingleJobDetailCard from "../../components/jobs/singlejobdetailview";

const requiredProps = {
    name: 1,
    jobtype: 1,
    workplace: 1,
    salary: 1,
    featured: 1,
    vacent: 1,
    urgent: 1,
    candidatescount: 1,
    "place.city": 1,
    "place.state": 1,
    "place.country": 1,
    createdAt: 1,
};

const requiredPropsView = {
    "place.longitude": 0,
    "place.latitude": 0,
    "place.location": 0,
    "place.street": 0,
    "place.zip": 0,
    thumbnail: 0,
    quality: 0,
};

const Index = ({ _collections }) => {
    const router = useRouter();
    //const [_collections, _setCollections] = useState(); // collections object
    const [jobs, setJobs] = useState([]); // jobs object
    const [clearJobs, setClearJobs] = useState(false);
    const [filterChange, setFilterChange] = useState(false);

    const [_up, _setUp] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [searchObj, setSearchObj] = useState(null);

    const [loading, setLoading] = useState(false);
    const [loadingSingle, setLoadingSingle] = useState(false);

    const [advancedFilterOpen, setAdvancedFilterOpen] = useState(false);

    const [total, setTotal] = useState(0);
    const [pages, setPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const [viewJobData, setViewJobData] = useState(null);

    // useEffect(() => {
    //     getCollections();
    // }, []);

    // update data on change of the parameters
    useEffect(() => {
        // wait until roter.isReady is true
        if (router.isReady) {
            if (!searchObj) {
                setSearchObj(router.query);
            }
            if (router.query.search) {
                setSearchText(router.query.search);
            }
            fetchdata();
        }
    }, [_up, router.isReady]);

    // tigger the update of the data
    const updateUI = () => {
        _setUp(!_up);
    };

    // data fetching main function
    const fetchdata = async () => {
        const res = await fetcher.get_Public(
            buildSearchQuery(),
            requiredProps,
            true,
            false,
            10,
            clearJobs ? 0 : currentPage - 1,
            router.query.sort ? JSON.parse(router.query.sort) : { createdAt: -1 },
            setLoading
        );
        if (res != null) {
            if (clearJobs) {
                setJobs(res.values);
                setCurrentPage(1);
                setClearJobs(false);
            } else setJobs([...jobs, ...res.values]);
            setTotal(res.count);
            setPages(Math.ceil(res.count / res.itemsperpage));
            setFilterChange(false);
        }
        if (searchObj != null) router.push({ query: { ...searchObj } });
    };

    // get search query according to the parameters
    const buildSearchQuery = () => {
        let query = { ...(searchObj == null ? router.query : searchObj) };
        if (query["salary.avarage"]) {
            query["salary.avarage"] = { $gte: query["salary.avarage"] };
        }
        if (query["search"]) {
            query["name"] = { $regex: query["search"], $options: "i" };
            query["search"] = undefined;
        }
        return query;
    };

    // get required collections
    // const getCollections = async () => {
    //     if (_collections == null)
    //         _setCollections(
    //             await collectionfetcher.getCollections(
    //                 ["jobcategory", "jobtype", "jobworkplace", "jobseniority", "jobindustry", "jobexperiencelevel", "jobeducationlevel", "jobminsalary", "countries"],
    //                 () => {}
    //             )
    //         );
    // };

    // get required collection values
    const getCollectionValues = (key) => {
        if (_collections == null) return [];
        const res = _collections.find((x) => x.key == key);
        if (res == null) return [];
        return res.values;
    };

    const categoryChange = (e) => {
        setSearchObj({ ...searchObj, category: e.target.value });
        setFilterChange(true);
    };
    const jobtypeChange = (e) => {
        setSearchObj({ ...searchObj, jobtype: e.target.value });
        setFilterChange(true);
    };
    const seniorityChange = (e) => {
        setSearchObj({ ...searchObj, seniority: e.target.value });
        setFilterChange(true);
    };
    const industryChange = (e) => {
        setSearchObj({ ...searchObj, industry: e.target.value });
        setFilterChange(true);
    };
    const experienceChange = (e) => {
        setSearchObj({ ...searchObj, experience: e.target.value });
        setFilterChange(true);
    };
    const workplaceChange = (e) => {
        setSearchObj({ ...searchObj, workplace: e.target.value });
        setFilterChange(true);
    };
    const educationChange = (e) => {
        setSearchObj({ ...searchObj, education: e.target.value });
        setFilterChange(true);
    };
    const salaryChange = (e) => {
        setSearchObj({ ...searchObj, "salary.avarage": e.target.value });
        setFilterChange(true);
    };
    const locationChange = (e) => {
        setSearchObj({ ...searchObj, "place.country": e.target.value });
        setFilterChange(true);
    };
    const searchChange = (e) => {
        setSearchText(e.target.value);
        setSearchObj({ ...searchObj, search: e.target.value });
        setFilterChange(true);
    };
    const vacentChange = (e) => {
        setSearchObj({ ...searchObj, vacent: e.target.value });
        setFilterChange(true);
    };

    const applyFilter = () => {
        setClearJobs(true);
        updateUI();
    };

    const clearFilter = () => {
        setFilterChange(true);
        setSearchObj({});
        setClearJobs(true);
        updateUI();
        setSearchText("");
    };

    const loadMore = () => {
        if (pages > currentPage) {
            setCurrentPage(currentPage + 1);
            updateUI();
        }
    };

    const viewJob = async (item) => {
        const dta = await fetcher.getById_Public(item._id, requiredPropsView, setLoadingSingle);
        if (dta) {
            setViewJobData(dta);
        }
    };

    return (
        <main className="max-w-7xl mx-auto">
            <Head>
                <title>Jobs - DEInclusive</title>
            </Head>
            <div className="md:pt-6 lg:py-12">
                <h1 className="text-gray-800 font-bold text-3xl text-center mb-4 md:mb-0">Job Feed</h1>
                <div className="mx-auto justify-center px-4 py-t md:pt-6 lg:pt-12 sm:px-6 md:px-8 flex flex-col lg:flex-row gap-x-5">
                    <div className="mt-1 mb-2 flex rounded-md shadow-sm w-full lg:w-5/12">
                        <span className="inline-flex items-center font-semibold px-4 rounded-l-md border border-r-0 border-gray-700 text-gray-700 sm:text-sm">What</span>
                        <input
                            type="text"
                            value={searchText}
                            onChange={searchChange}
                            placeholder="Keyword, job title, or company name"
                            className="block  border-l-0 w-full py-3 shadow-sm  sm:text-sm border-gray-700 rounded-r-md focus:ring-0 focus:border-gray-700"
                        />
                    </div>
                    <div className="mt-1 flex mb-2 rounded-md shadow-sm w-full lg:w-5/12">
                        <span className="inline-flex items-center font-semibold px-4 rounded-l-md border border-r-0 border-gray-700 text-gray-700 sm:text-sm">Where</span>
                        <select
                            value={(searchObj && searchObj["place.country"]) || router.query["place.country"] || ""}
                            onChange={locationChange}
                            className="block border-l-0 w-full py-3 shadow-sm  sm:text-sm border-gray-700 rounded-r-md focus:ring-0 focus:border-gray-700"
                        >
                            <option selected disabled value={""}>
                                Select Location
                            </option>
                            {getCollectionValues("countries").map((v) => (
                                <option key={v.key} value={v.value}>
                                    {v.value}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mt-1 mb-2 flex rounded-md shadow-sm w-full lg:w-auto">
                        <button
                            disabled={loading}
                            onClick={applyFilter}
                            className="flex items-center w-full justify-center px-4 py-2 border border-transparent text-base  font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
                        >
                            Find Jobs
                        </button>
                    </div>
                </div>
                <div className="flex flex-row align-middle justify-center mb-8 mt-3 px-3 text-center">
                    <p className="text-gray-700 mt-3 text-base font-semibold">
                        Find Perfectly Matching Job to You!<br></br>
                        <span className="font-bold underline">or</span> Use Below Advanced{" "}
                        <span className="text-indigo-600 font-bold hover:text-indigo-500 hover:underline">Filter</span> to Find a Better Job.
                    </p>
                </div>
                <div className="mx-auto border-b border-gray-200 pb-8 px-4  sm:px-6 md:px-8 flex justify-center flex-row flex-wrap gap-x-5 gap-y-3 justify-items-stretch">
                    <select
                        value={searchObj?.category || router.query.category || ""}
                        onChange={categoryChange}
                        className="block shadow-sm sm:text-sm w-full md:w-auto border-gray-700 rounded-md focus:ring-0 focus:border-gray-700"
                    >
                        <option selected disabled value={""}>
                            Category
                        </option>
                        {getCollectionValues("jobcategory").map((v) => (
                            <option key={v.key} value={v.value}>
                                {v.value}
                            </option>
                        ))}
                    </select>
                    <select
                        value={searchObj?.jobtype || router.query.jobtype || ""}
                        onChange={jobtypeChange}
                        className="block shadow-sm sm:text-sm w-full md:w-auto border-gray-700 rounded-md focus:ring-0 focus:border-gray-700"
                    >
                        <option selected disabled value={""}>
                            Select Job Type
                        </option>
                        {getCollectionValues("jobtype").map((v) => (
                            <option key={v.key} value={v.value}>
                                {v.value}
                            </option>
                        ))}
                    </select>
                    <select
                        value={searchObj?.seniority || router.query.seniority || ""}
                        onChange={seniorityChange}
                        className="block shadow-sm sm:text-sm w-full md:w-auto border-gray-700 rounded-md focus:ring-0 focus:border-gray-700"
                    >
                        <option selected disabled value={""}>
                            Select Seniority
                        </option>
                        {getCollectionValues("jobseniority").map((v) => (
                            <option key={v.key} value={v.value}>
                                {v.value}
                            </option>
                        ))}
                    </select>
                    <select
                        value={searchObj?.industry || router.query.industry || ""}
                        onChange={industryChange}
                        className="block shadow-sm sm:text-sm w-full md:w-auto border-gray-700 rounded-md focus:ring-0 focus:border-gray-700"
                    >
                        <option selected disabled value={""}>
                            Select Industry
                        </option>
                        {getCollectionValues("jobindustry").map((v) => (
                            <option key={v.key} value={v.value}>
                                {v.value}
                            </option>
                        ))}
                    </select>
                    <select
                        value={searchObj?.experience || router.query.experience || ""}
                        onChange={experienceChange}
                        className="block shadow-sm sm:text-sm w-full md:w-auto border-gray-700 rounded-md focus:ring-0 focus:border-gray-700"
                    >
                        <option selected disabled value={""}>
                            Select Experience Level
                        </option>
                        {getCollectionValues("jobexperiencelevel").map((v) => (
                            <option key={v.key} value={v.value}>
                                {v.value}
                            </option>
                        ))}
                    </select>
                    <select
                        value={searchObj?.workplace || router.query.workplace || ""}
                        onChange={workplaceChange}
                        className="block shadow-sm sm:text-sm w-full md:w-auto border-gray-700 rounded-md focus:ring-0 focus:border-gray-700"
                    >
                        <option selected disabled value={""}>
                            Select Workplace Type
                        </option>
                        {getCollectionValues("jobworkplace").map((v) => (
                            <option key={v.key} value={v.value}>
                                {v.value}
                            </option>
                        ))}
                    </select>
                    <select
                        value={searchObj?.education || router.query.education || ""}
                        onChange={educationChange}
                        className="block shadow-sm sm:text-sm w-full md:w-auto border-gray-700 rounded-md focus:ring-0 focus:border-gray-700"
                    >
                        <option selected disabled value={""}>
                            Select Education Level
                        </option>
                        {getCollectionValues("jobeducationlevel").map((v) => (
                            <option key={v.key} value={v.value}>
                                {v.value}
                            </option>
                        ))}
                    </select>
                    <select
                        value={(searchObj && searchObj["salary.avarage"]) || router.query["salary.avarage"] || ""}
                        onChange={salaryChange}
                        className="block shadow-sm sm:text-sm w-full md:w-auto border-gray-700 rounded-md focus:ring-0 focus:border-gray-700"
                    >
                        <option selected disabled value={""}>
                            Min Salary
                        </option>
                        {getCollectionValues("jobminsalary").map((v) => (
                            <option key={v.key} value={v.value}>
                                {v.value}
                            </option>
                        ))}
                    </select>
                    {/* {filterChange && (
                        <button
                            onClick={applyFilter}
                            className="flex items-center justify-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
                        >
                            Search
                        </button>
                    )} */}

                    {searchObj && Object.keys(searchObj).length > 0 && (
                        <>
                            <button
                                onClick={clearFilter}
                                className="flex items-center justify-center w-full md:w-auto px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-100 border-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
                            >
                                Reset Filter
                            </button>
                        </>
                    )}
                </div>
            </div>
            <div className="mx-auto px-4 sm:px-6">
                <div className="mt-10 lg:mt-0">
                    <h2 className="text-gray-800 font-semibold text-xl">Job Openings (Found {total} jobs)</h2>

                    <div className="mt-4 flex flex-row">
                        <div className="felx flex-col w-full lg:min-w-[32rem] lg:max-w-[32rem]">
                            {jobs &&
                                jobs.length > 0 &&
                                jobs?.map((job, index) => (
                                    <SingleJobCard
                                        key={index}
                                        job={job}
                                        selected={job._id == viewJobData?._id}
                                        onClick={() => viewJob(job)}
                                        onDoubleClick={() => router.push(`/job/${job._id}`)}
                                    ></SingleJobCard>
                                ))}

                            {(!jobs || filterChange || jobs.length == 0) &&
                                loading &&
                                Array(10)
                                    .fill(1)
                                    .map((_, index) => <SingleJobCardLoading key={index}></SingleJobCardLoading>)}
                            {jobs && total > jobs.length && (
                                <button
                                    disabled={loading}
                                    onClick={loadMore}
                                    className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                                >
                                    {loading ? "Loading..." : "Load More"}
                                </button>
                            )}
                        </div>

                        <div className="felx flex-col w-full ml-6 sticky hidden lg:block">
                            <SingleJobDetailCard job={viewJobData} loading={loadingSingle} />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

Index.getInitialProps = async (ctx) => {
    return {
        _collections: await collectionfetcher.getCollections(
            ["jobcategory", "jobtype", "jobworkplace", "jobseniority", "jobindustry", "jobexperiencelevel", "jobeducationlevel", "jobminsalary", "countries"],
            () => {}
        ),
    };
};

Index.layout = "main";

export default Index;
