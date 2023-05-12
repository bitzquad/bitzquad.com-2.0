/*    Imports    */
import { useState, useRef, useEffect } from "react";
import { ChevronLeftIcon, FilterIcon, SearchIcon, ExclamationIcon, PlusIcon, InformationCircleIcon, TrashIcon, PencilIcon } from "@heroicons/react/solid";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import userfetcher from "../../../../constants/fetch/collection";
import jobfetcher from "../../../../constants/fetch/collection";
import eventfetcher from "../../../../constants/fetch/collection";
import companyfetcher from "../../../../constants/fetch/collection";
import collectionfetcher from "../../../../constants/fetch/collection";
import newsfetcher from "../../../../constants/fetch/collection";
import blogfetcher from "../../../../constants/fetch/collection";

import SidePanel from "../../../../components/_common/sidepanel";

// import Add from "./addcollection";
// import AddValue from "./addvalue";

const DBList = [
    {
        name: "Users",
        fetcher: userfetcher,
    },
    {
        jobs: "Jobs",
        fetcher: jobfetcher,
    },
    {
        name: "Events",
        fetcher: eventfetcher,
    },
    {
        name: "Companies",
        fetcher: companyfetcher,
    },
    {
        name: "News",
        fetcher: newsfetcher,
    },
    {
        name: "Blog",
        fetcher: blogfetcher,
    },
    {
        name: "Collections",
        fetcher: collectionfetcher,
    },
];

const Collections = (props) => {
    const pageRef = useRef();
    const [data, setData] = useState([]);
    const [collection, setCollection] = useState(null);

    const [_up, _setUp] = useState(false);
    // const [_schTxtCollection, setSchTxtCollection] = useState("");
    // const [_schTxtValue, setSchTxtValue] = useState("");

    const [collectionLoading, setCollectionLoading] = useState(false);
    const [collectionDetailLoading, setCollectionDetailLoading] = useState(false);
    const [collectionDataUploadng, setCollectionDataUploadng] = useState(false);
    const [collectionDataUpdating, setCollectionDataUpdating] = useState(false);
    const [collectionDeleting, setCollectionDeleting] = useState(false);

    const [showCollectionAdd, setShowCollectionAdd] = useState(false);
    const [showCollectionEdit, setShowCollectionEdit] = useState(false);
    const [showValueAdd, setShowValueAdd] = useState(false);
    const [showValueEdit, setShowValueEdit] = useState(false);

    const [editingCollectionData, setEditingCollectionData] = useState(null);
    const [editingValueData, setEditingValueData] = useState(null);
    const [editingValueDataIndex, setEditingValueDataIndex] = useState(null);

    // define what props should fetch form the server
    const requiredProps = { name: 1, key: 1, valuesameaskey: 1, valuetype: 1, values: 1 };

    // useEffect(() => {
    //     // if (router.query.searchcollection) setSchTxtCollection(router.query.searchcollection);
    //     // if (router.query.searchvalue) setSchTxtValue(router.query.searchvalue);
    //     //if (router.query.collection) setCollection(router.query.collection);

    //     router.push({ query: { ...router.query } });
    //     updateUI();
    // }, []);

    // fetch data from the server
    useEffect(() => {
        fetchcollections();
    }, [_up]);

    // tigger the update of the data
    const updateUI = () => {
        _setUp(!_up);
    };
    const fetchcollections = async () => {
        const res = await collectionfetcher.get({}, requiredProps, true, false, 1000, 0, { name: 1 }, setCollectionLoading);
        if (res != null) {
            setData(res.values);
        }
    };
    // add new collection
    const submitNewCollection = async (item) => {
        const coll = await collectionfetcher.create(item, false, setCollectionDataUploadng);
        if (coll) {
            setShowCollectionAdd(false);
            updateUI();
        } else {
            alert("Failed To Add Collection.");
        }
    };
    // edit collection
    const updateCollection = async (item) => {
        const usr = await collectionfetcher.update(item, false, setCollectionDataUpdating);
        if (usr) {
            setShowCollectionEdit(false);
            updateUI();
        } else {
            alert("Failed To update Collection.");
        }
    };
    // delete collection
    const removeCollection = async (id) => {
        if (id == null) return;
        if (confirm("Are you sure you want to delete this collection?")) {
            const usr = await collectionfetcher.remove(id, false, setCollectionDeleting);
            if (usr) {
                updateUI();
            } else {
                alert("Failed To delete Collection.");
            }
        }
    };
    // add value to collection
    const addValue = async (item) => {
        let tmp = { ...collection };
        collection.values.push(item);
        setCollection(tmp);
        const coll = await collectionfetcher.update(tmp, false, setCollectionDataUpdating);
        if (coll) {
            setShowValueAdd(false);
            //updateUI();
        } else {
            alert("Failed To update Collection Values.");
        }
    };
    // update value of collection
    const updateValue = async (item) => {
        console.log(editingValueDataIndex);
        if (editingValueDataIndex == null) return;
        let tmp = { ...collection };
        tmp.values[editingValueDataIndex] = item;
        setCollection(tmp);
        const coll = await collectionfetcher.update(tmp, false, setCollectionDataUpdating);
        if (coll) {
            setShowValueEdit(false);
            updateUI();
        } else {
            alert("Failed To update Collection Values.");
        }
    };
    // delete value of collection
    const removeValue = async (index) => {
        if (collection == null || index == null) return;
        if (confirm("Are you sure you want to delete this value?")) {
            let tmp = { ...collection };
            tmp.values.splice(index, 1);
            setCollection(tmp);
            const coll = await collectionfetcher.update(tmp, false, setCollectionDataUpdating);
            if (coll) {
                // setDeletingValueIndex(null);
                // setShowValueDelete(false);
                //updateUI();
            } else {
                alert("Failed To delete Collection Values.");
            }
        }
    };

    // toggle the data update modal
    const _edit = async (item) => {
        const dta = await collectionfetcher.getById(item._id, {}, setCollectionDetailLoading);
        if (dta) {
            setEditingCollectionData(dta);
            setShowCollectionEdit(true);
        }
    };
    // handle drag and drop and update the collection data
    async function handleOnDragEnd(result) {
        if (!result.destination) return;

        const items = Array.from(collection.values);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setCollection({ ...collection, values: items });

        const coll = await collectionfetcher.update({ ...collection, values: items }, false, setCollectionDataUpdating);
        if (coll) {
        } else {
            alert("Failed To update Collection.");
        }
    }

    async function restoreCollections() {
        const json = [
            {
                name: "Countries",
                key: "countries",
                valuesameaskey: true,
                valuetype: "text",
                values: [
                    { key: "United States", value: "United States" },
                    { key: "United Kingdom", value: "United Kingdom" },
                    { key: "Sri Lanka", value: "Sri Lanka" },
                ],
            },
            {
                name: "Currencies",
                key: "currencies",
                valuesameaskey: true,
                valuetype: "text",
                values: [
                    { key: "USD ($)", value: "USD ($)" },
                    { key: "Pound Sterling (£)", value: "Pound Sterling (£)" },
                ],
            },
            {
                name: "Job Category",
                key: "jobcategory",
                valuesameaskey: true,
                valuetype: "text",
                values: [
                    { key: "Business", value: "Business" },
                    { key: "IT", value: "IT" },
                ],
            },
            {
                name: "Job Education Level",
                key: "jobeducationlevel",
                valuesameaskey: true,
                valuetype: "text",
                values: [
                    { key: "Less than high school", value: "Less than high school" },
                    { key: "High school diploma or equivalent", value: "High school diploma or equivalent" },
                    { key: "Some college, no degree", value: "Some college, no degree" },
                    { key: "Postsecondary non-degree award", value: "Postsecondary non-degree award" },
                    { key: "Associate's degree", value: "Associate's degree" },
                    { key: "Bachelor's degree", value: "Bachelor's degree" },
                    { key: "Master's degree", value: "Master's degree" },
                    { key: "Doctoral or professional degree", value: "Doctoral or professional degree" },
                ],
            },
            {
                name: "Job Experience Level",
                key: "jobexperiencelevel",
                valuesameaskey: true,
                valuetype: "text",
                values: [
                    { key: "No Experience", value: "No Experience" },
                    { key: "1 Month Experience", value: "1 Month Experience" },
                    { key: "3 Month Experience", value: "3 Month Experience" },
                    { key: "4 Month Experience", value: "4 Month Experience" },
                    { key: "5 Month Experience", value: "5 Month Experience" },
                    { key: "6 Month Experience", value: "6 Month Experience" },
                    { key: "1+ Year Experience", value: "1+ Year Experience" },
                    { key: "2+ Years Experience", value: "2+ Years Experience" },
                ],
            },
            {
                name: "Job Industry",
                key: "jobindustry",
                valuesameaskey: true,
                valuetype: "text",
                values: [
                    { key: "Advertising and marketing", value: "Advertising and marketing" },
                    { key: "Aerospace", value: "Aerospace" },
                    { key: "Agriculture", value: "Agriculture" },
                    { key: "Computer and technology", value: "Computer and technology" },
                    { key: "Construction", value: "Construction" },
                    { key: "Education", value: "Education" },
                    { key: "Energy", value: "Energy" },
                    { key: "Entertainment", value: "Entertainment" },
                    { key: "Fashion", value: "Fashion" },
                    { key: "Finance and economic", value: "Finance and economic" },
                    { key: "Food and beverage", value: "Food and beverage" },
                    { key: "Health care", value: "Health care" },
                    { key: "Hospitality", value: "Hospitality" },
                    { key: "Manufacturing", value: "Manufacturing" },
                    { key: "Media and news", value: "Media and news" },
                    { key: "Mining", value: "Mining" },
                    { key: "Pharmaceutical", value: "Pharmaceutical" },
                    { key: "Telecommunication", value: "Telecommunication" },
                    { key: "Transportation", value: "Transportation" },
                ],
            },
            { name: "Job Min. Salary", key: "jobminsalary", valuesameaskey: false, valuetype: "number", values: [] },
            {
                name: "Job Min. Salary",
                key: "jobminsalary",
                valuesameaskey: false,
                valuetype: "number",
                values: [
                    { key: "100.00 +", value: "100" },
                    { key: "250.00 +", value: "250" },
                    { key: "500.00 +", value: "500" },
                    { key: "1000.00 +", value: "1000" },
                    { key: "5000.00 +", value: "5000" },
                    { key: "10000.00 +", value: "10000" },
                    { key: "25000.00 +", value: "25000" },
                    { key: "50000.00 +", value: "50000" },
                    { key: "100000.00 +", value: "100000" },
                ],
            },
            {
                name: "Job Seniority",
                key: "jobseniority",
                valuesameaskey: true,
                valuetype: "text",
                values: [
                    { key: "Internship", value: "Internship" },
                    { key: "Entry Level", value: "Entry Level" },
                    { key: "Associate", value: "Associate" },
                ],
            },
            {
                name: "Job Type",
                key: "jobtype",
                valuesameaskey: true,
                valuetype: "text",
                values: [
                    { key: "Full Time", value: "Full Time" },
                    { key: "Part Time", value: "Part Time" },
                    { key: "Contract", value: "Contract" },
                    { key: "Temporary", value: "Temporary" },
                ],
            },
            {
                name: "Job Workplace",
                key: "jobworkplace",
                valuesameaskey: true,
                valuetype: "text",
                values: [
                    { key: "On-Site", value: "On-Site" },
                    { key: "Remote", value: "Remote" },
                    { key: "Hybrid", value: "Hybrid" },
                ],
            },
            {
                name: "News Category",
                key: "newscategory",
                valuesameaskey: true,
                valuetype: "text",
                values: [
                    { key: "About Company", value: "About Company" },
                    { key: "Tech", value: "Tech" },
                    { key: "World", value: "World" },
                ],
            },
            {
                name: "User Gender",
                key: "usergender",
                valuesameaskey: true,
                valuetype: "text",
                values: [
                    { key: "He / Him", value: "He / Him" },
                    { key: "She / Her", value: "She / Her" },
                ],
            },
        ];
        const idsresp = await collectionfetcher.getAll({ _id: 1 }, false, false, () => {});
        const delresp = await collectionfetcher.removeBulk(
            idsresp.values.map((v) => v._id),
            true,
            () => {}
        );
        if (delresp) {
            for (var i = 0; i < json.length; i++) {
                await collectionfetcher.create(json[i], false, () => {});
            }
        } else alert("Restore Failed");
    }

    return (
        <>
            <div className="-my-0 -mx-4 flex h-min sm:-mx-6 md:-mx-8" ref={pageRef}>
                <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
                    <div className="relative z-0 flex flex-1 overflow-hidden">
                        <main className="relative z-0 flex-1 overflow-y-auto focus:outline-none lg:order-last">
                            <div>
                                <div className="px-6 pt-6 pb-4">
                                    <h2 className="flex items-start text-lg font-medium text-gray-900">
                                        <ChevronLeftIcon className=" h-[1.75rem] w-[1.75rem] lg:hidden" aria-hidden="true" /> Values
                                    </h2>
                                    <p className="mt-1 text-sm text-gray-600">
                                        Found {collection?.values.length || 0} key value pairs in {collection?.name}
                                    </p>
                                    <form className="mt-6 flex space-x-4" action="#">
                                        <div className="min-w-0 flex-1">
                                            <label htmlFor="search" className="sr-only">
                                                Search
                                            </label>
                                            <div className="relative rounded-md shadow-sm">
                                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                    <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                </div>
                                                <input type="search" name="search" id="search" className=" block w-full rounded-md border-gray-300 pl-10 sm:text-sm" placeholder="Search" />
                                            </div>
                                        </div>
                                        <button type="submit" className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-3.5 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none">
                                            <FilterIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                            <span className="sr-only">Search</span>
                                        </button>
                                    </form>
                                </div>
                                {/* Directory list */}
                                <nav className="min-h-0 flex-1 overflow-y-auto border-t border-b border-gray-200" aria-label="Directory">
                                    <div className="relative">
                                        <DragDropContext onDragEnd={handleOnDragEnd}>
                                            <Droppable droppableId="characters">
                                                {(provided) => (
                                                    <ul role="list" className="characters relative z-0 divide-y  divide-gray-200" {...provided.droppableProps} ref={provided.innerRef}>
                                                        {collection &&
                                                            collection.values.map((item, index) => (
                                                                <Draggable key={item.key} draggableId={item.key} index={index}>
                                                                    {(provided) => (
                                                                        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                                            <div className="relative flex items-center space-x-3 px-6 py-5 hover:bg-gray-50">
                                                                                <div className="min-w-0 flex-1">
                                                                                    <a className="focus:outline-none">
                                                                                        {/* Extend touch target to entire panel */}
                                                                                        <div className="!pointer-events-auto absolute right-6 left-auto z-10 float-right">
                                                                                            <button
                                                                                                onClick={() => {
                                                                                                    setEditingValueData(item);
                                                                                                    setEditingValueDataIndex(index);
                                                                                                    setShowValueEdit(true);
                                                                                                }}
                                                                                                type="button"
                                                                                                className="mr-2 inline-flex justify-center rounded-md border border-yellow-300 bg-white px-3.5 py-2 text-sm font-medium text-yellow-400 shadow-sm hover:bg-yellow-400 hover:text-white "
                                                                                            >
                                                                                                <PencilIcon className="h-5 w-5" aria-hidden="true" />
                                                                                                <span className="sr-only">Edit</span>
                                                                                            </button>
                                                                                            <button onClick={() => removeValue(index)} type="button" className="inline-flex justify-center rounded-md border border-red-300 bg-white px-3.5 py-2 text-sm font-medium text-red-700 shadow-sm hover:bg-red-700 hover:text-white">
                                                                                                <TrashIcon className="h-5 w-5 " aria-hidden="true" />
                                                                                                <span className="sr-only">Delete</span>
                                                                                            </button>
                                                                                        </div>
                                                                                        <span className="absolute inset-0" aria-hidden="true" />
                                                                                        <p className="text-sm font-medium text-gray-900">{item.key}</p>
                                                                                        <p className="truncate text-sm text-gray-500">{item.value}</p>
                                                                                    </a>
                                                                                </div>
                                                                            </div>
                                                                        </li>
                                                                    )}
                                                                </Draggable>
                                                            ))}
                                                        {!collection && (
                                                            <li>
                                                                <div className="relative flex animate-pulse items-center space-x-3 px-6 py-5 hover:bg-gray-50">
                                                                    <div className="min-w-0 flex-1">
                                                                        <a className="focus:outline-none">
                                                                            {/* Extend touch target to entire panel */}
                                                                            <span className="absolute inset-0" aria-hidden="true" />

                                                                            <div className="rounded-md bg-cyan-50 p-4">
                                                                                <div className="flex">
                                                                                    <div className="flex-shrink-0">
                                                                                        <ExclamationIcon className="h-5 w-5 text-cyan-400" aria-hidden="true" />
                                                                                    </div>
                                                                                    <div className="ml-3">
                                                                                        <h3 className="text-sm font-medium text-cyan-800">Select Collection To View Values</h3>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        )}

                                                        {collection && collection.values.length === 0 && (
                                                            <li>
                                                                <div className="relative flex animate-pulse items-center space-x-3 px-6 py-5 hover:bg-gray-50">
                                                                    <div className="min-w-0 flex-1">
                                                                        <a className="focus:outline-none">
                                                                            {/* Extend touch target to entire panel */}
                                                                            <span className="absolute inset-0" aria-hidden="true" />

                                                                            <div className="rounded-md bg-yellow-50 p-4">
                                                                                <div className="flex">
                                                                                    <div className="flex-shrink-0">
                                                                                        <ExclamationIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                                                                                    </div>
                                                                                    <div className="ml-3">
                                                                                        <h3 className="text-sm font-medium text-yellow-800">No Values</h3>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        )}
                                                        {collection && (
                                                            <li>
                                                                <div className="relative flex items-center space-x-3 px-6 py-5 hover:bg-gray-50">
                                                                    <div className="min-w-0 flex-1">
                                                                        <a className="focus:outline-none">
                                                                            {/* Extend touch target to entire panel */}
                                                                            <div className="mb-3 rounded-md bg-indigo-50 p-4">
                                                                                <div className="flex">
                                                                                    <div className="flex-shrink-0">
                                                                                        <InformationCircleIcon className="h-5 w-5 text-indigo-400" aria-hidden="true" />
                                                                                    </div>
                                                                                    <div className="ml-3">
                                                                                        <h3 className="text-sm font-medium text-indigo-800"> Hint : Drag & Drop Values to Edit the Order.</h3>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <button
                                                                                onClick={() => {
                                                                                    setShowValueAdd(true);
                                                                                }}
                                                                                type="button"
                                                                                className="inline-flex w-full items-center rounded-md border border-transparent bg-cyan-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-cyan-700 focus:outline-none"
                                                                            >
                                                                                <PlusIcon className="mr-3 h-5 w-5" aria-hidden="true" /> Add New Value
                                                                            </button>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        )}
                                                    </ul>
                                                )}
                                            </Droppable>
                                        </DragDropContext>
                                    </div>
                                </nav>
                            </div>
                        </main>
                        <aside className="hidden w-96 flex-shrink-0 border-r border-gray-200 lg:order-first lg:flex lg:flex-col">
                            <div className="px-6 pt-6 pb-4">
                                <h2 className="text-lg font-medium text-gray-900">Collections</h2>
                                <p className="mt-1 text-sm text-gray-600">Found {data.length || 0} collection</p>
                                <form className="mt-6 flex space-x-4" action="#">
                                    <div className="min-w-0 flex-1">
                                        <label htmlFor="search" className="sr-only">
                                            Search
                                        </label>
                                        <div className="relative rounded-md shadow-sm">
                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                            </div>
                                            <input type="search" name="search" id="search" className="block w-full rounded-md border-gray-300 pl-10 sm:text-sm" placeholder="Search" />
                                        </div>
                                    </div>
                                    <button type="submit" className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-3.5 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 ">
                                        <FilterIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        <span className="sr-only">Search</span>
                                    </button>
                                </form>
                            </div>
                            {/* Directory list */}
                            <nav className="min-h-0 flex-1 overflow-y-auto border-t border-b border-gray-200" aria-label="Directory">
                                <div className="relative">
                                    <ul role="list" className="relative z-0 divide-y divide-gray-200  ">
                                        {!collectionLoading &&
                                            data.map((item, index) => (
                                                <li
                                                    key={index}
                                                    onClick={() => {
                                                        setCollection(item);
                                                        pageRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
                                                    }}
                                                >
                                                    <div className={`relative flex items-center space-x-3 px-6 py-5 hover:bg-gray-50 ${collection?._id == item._id ? " !bg-green-50" : ""}`}>
                                                        <div className="min-w-0 flex-1">
                                                            <a className="focus:outline-none">
                                                                {/* Extend touch target to entire panel */}
                                                                <span className="absolute inset-0" aria-hidden="true" />
                                                                <div className="absolute right-6 left-auto float-right">
                                                                    <button onClick={() => removeCollection(item._id)} type="button" className="inline-flex justify-center rounded-md border border-red-300 bg-white px-3.5 py-2 text-sm font-medium text-red-700 shadow-sm hover:bg-red-700 hover:text-white focus:outline-none ">
                                                                        <TrashIcon className="h-5 w-5" aria-hidden="true" />
                                                                        <span className="sr-only">Delete</span>
                                                                    </button>
                                                                </div>
                                                                <p className="text-base font-medium text-gray-900">
                                                                    {item.name}
                                                                    <span className="ml-3 inline-flex items-center rounded-full bg-cyan-100 px-2.5 py-0.5 text-xs font-medium text-cyan-800">{item.values.length}</span>
                                                                </p>
                                                                <p className="truncate text-sm text-gray-500">
                                                                    {item.key} | {item.valuetype}
                                                                </p>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        {collectionLoading && (
                                            <li>
                                                <div className="relative flex animate-pulse items-center space-x-3 px-6 py-5 hover:bg-gray-50">
                                                    <div className="min-w-0 flex-1">
                                                        <a className="focus:outline-none">
                                                            {/* Extend touch target to entire panel */}
                                                            <span className="absolute inset-0" aria-hidden="true" />

                                                            <div className="mb-5 h-2 rounded bg-gray-300"></div>
                                                            <div className="flex truncate text-sm text-gray-500 ">
                                                                <div className="mt-2 mr-2 h-2 w-5/12 rounded bg-gray-300"></div> | <div className="mt-2 ml-2 h-2 w-5/12 rounded bg-gray-300"></div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                </div>
                                            </li>
                                        )}

                                        {!collectionLoading && data.length === 0 && (
                                            <li>
                                                <div className="relative flex animate-pulse items-center space-x-3 px-6 py-5 hover:bg-gray-50">
                                                    <div className="min-w-0 flex-1">
                                                        <a className="focus:outline-none">
                                                            {/* Extend touch target to entire panel */}
                                                            <span className="absolute inset-0" aria-hidden="true" />

                                                            <div className="rounded-md bg-yellow-50 p-4">
                                                                <div className="flex">
                                                                    <div className="flex-shrink-0">
                                                                        <ExclamationIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                                                                    </div>
                                                                    <div className="ml-3">
                                                                        <h3 className="text-sm font-medium text-yellow-800">No Collections</h3>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                </div>
                                            </li>
                                        )}
                                        <li>
                                            <div className="relative flex items-center space-x-3 px-6 py-5 hover:bg-gray-50">
                                                <div className="min-w-0 flex-1">
                                                    <a className="focus:outline-none">
                                                        {/* Extend touch target to entire panel */}

                                                        <button
                                                            onClick={() => {
                                                                setShowCollectionAdd(true);
                                                            }}
                                                            type="button"
                                                            className="inline-flex w-full items-center rounded-md border border-transparent bg-green-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-green-700"
                                                        >
                                                            <PlusIcon className="mr-3 h-5 w-5" aria-hidden="true" /> Create New Collection
                                                        </button>
                                                    </a>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="relative flex items-center space-x-3 px-6 py-5 hover:bg-gray-50">
                                                <div className="min-w-0 flex-1">
                                                    <a className="focus:outline-none">
                                                        {/* Extend touch target to entire panel */}

                                                        <button
                                                            onClick={() => {
                                                                restoreCollections();
                                                            }}
                                                            type="button"
                                                            className="inline-flex w-full items-center rounded-md border border-transparent bg-red-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-red-700"
                                                        >
                                                            <PlusIcon className="mr-3 h-5 w-5" aria-hidden="true" /> Restore Collections
                                                        </button>
                                                    </a>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </nav>
                        </aside>
                    </div>
                </div>
            </div>
            {/* <SidePanel title={`Add Collection`} setOpen={setShowCollectionAdd} isOpen={showCollectionAdd}>
                <Add
                    collections={data}
                    onSubmit={submitNewCollection}
                    onCancel={() => {
                        setShowCollectionAdd(false);
                    }}
                />
            </SidePanel>
            <SidePanel title={`Edit Collection '${editingCollectionData?._id}'`} setOpen={setShowCollectionEdit} isOpen={showCollectionEdit}>
                {editingCollectionData && (
                    <Add
                        readOnlyProps={["_id", "key", "valuetype"]}
                        data={editingCollectionData}
                        onSubmit={updateCollection}
                        onCancel={() => {
                            setShowCollectionEdit(false);
                        }}
                    />
                )}
            </SidePanel>

            <SidePanel title={`Add Value to '${collection?.name}'`} setOpen={setShowValueAdd} isOpen={showValueAdd}>
                {collection && (
                    <AddValue
                        collection={collection}
                        onSubmit={addValue}
                        onCancel={() => {
                            setShowValueAdd(false);
                        }}
                    />
                )}
            </SidePanel>
            <SidePanel title={`Edit Value in '${collection?.name}'`} setOpen={setShowValueEdit} isOpen={showValueEdit}>
                {collection && editingValueData && (
                    <AddValue
                        collection={collection}
                        data={editingValueData}
                        readOnlyProps={["_id", "key"]}
                        onSubmit={updateValue}
                        onCancel={() => {
                            showValueEdit(false);
                        }}
                    />
                )}
            </SidePanel> */}
        </>
    );
};

export default Collections;
