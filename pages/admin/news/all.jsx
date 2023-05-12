/*    Imports    */

import { Dialog, Listbox, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import {
    SearchIcon,
    SortAscendingIcon,
    SortDescendingIcon,
    MinusIcon,
    PencilIcon,
    TrashIcon,
    ArrowLeftIcon,
    ArrowRightIcon,
    ExclamationIcon,
    XIcon,
    PlusIcon,
    UploadIcon,
    CheckIcon,
} from "@heroicons/react/solid";
import { useRouter } from "next/router";

import fetcher from "../../../constants/fetch/news";

import dynamic from "next/dynamic";
const Add = dynamic(() => import("./add"));
const Modal = dynamic(() => import("../../../components/_common/modal"));
const SidePanel = dynamic(() => import("../../../components/_common/sidepanel"));
import EApprovalState from "../../../types/enum/_common/EApprovalState";

// data table columns
const columns = [
    {
        name: "#",
        selector: "_id",
        searchable: false,
        multisearchable: false,
        sortable: false,
        exclude: true,
    },
    {
        name: "Title",
        selector: "name",
        searchable: true,
        multisearchable: true,
        sortable: true,
        exclude: false,
    },
    {
        name: "Category",
        selector: "category",
        searchable: true,
        multisearchable: true,
        sortable: true,
        exclude: false,
    },
    {
        name: "Featured",
        selector: "featured",
        searchable: true,
        multisearchable: true,
        sortable: true,
        exclude: false,
    },
    {
        name: "Draft",
        selector: "draft",
        searchable: true,
        multisearchable: true,
        sortable: true,
        exclude: false,
    },
    {
        name: "Status",
        selector: "status",
        searchable: false,
        multisearchable: false,
        sortable: true,
        exclude: false,
    },
    {
        name: "Actions",
        selector: "",
        searchable: false,
        multisearchable: false,
        sortable: false,
        exclude: true,
    },
];

let search = ""; // define search value variable
const Datatable = (props) => {
    const router = useRouter();

    const [_up, _setUp] = useState(false);
    const [_schtxt, _setSchtxt] = useState("");

    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const [pages, setPages] = useState(0);
    const [editingData, setEditingData] = useState(null);
    const [editingOpen, setEditingOpen] = useState(false);
    const [deletingOpen, setDeletingOpen] = useState(false);

    const [loading, setLoading] = useState(false);
    const [loadingSingle, setLoadingSingle] = useState(false);
    const [loadingUpdate, setLoadingUpdate] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);

    const [selectedData, setSelectedData] = useState([]);

    // action models states
    const [showStatusUpdate, setShowStatusUpdate] = useState(false);
    const [updatingStatus, setUpdatingStatus] = useState("");
    function classNames(...classes) {
        return classes.filter(Boolean).join(" ");
    }

    // define what props should fetch form the server
    const requiredProps = {
        name: 1,
        category: 1,
        featured: 1,
        draft: 1,
        status: 1,
    };

    // data select actions
    const selectActions = [
        {
            alwaysVisible: true,
            single: true,
            multi: false,
            button: () => (
                <button
                    type="button"
                    className="mr-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none "
                    onClick={() => {
                        router.push("?tab=2");
                    }}
                >
                    Add News Post <PlusIcon className="ml-2 h-5 w-5" aria-hidden="true" />
                </button>
            ),
        },
        {
            alwaysVisible: false,
            single: true,
            multi: true,
            button: () => (
                <button
                    type="button"
                    className="mr-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none "
                    onClick={() => {
                        setShowStatusUpdate(true);
                    }}
                >
                    Update Status <UploadIcon className="ml-2 h-5 w-5" aria-hidden="true" />
                </button>
            ),
        },
        {
            alwaysVisible: false,
            single: true,
            multi: true,
            button: () => (
                <button
                    type="button"
                    className="mr-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none "
                    onClick={() => {
                        setDeletingOpen(true);
                    }}
                >
                    Delete Selected <TrashIcon className="ml-2 h-5 w-5" aria-hidden="true" />
                </button>
            ),
        },
    ];

    // pass url query information to the state variables
    useEffect(() => {
        if (router.query.search) setSearch(router.query.search);
        if (!router.query.page) router.query.page = 1;
        if (!router.query.itemsperpage) router.query.itemsperpage = 10;
        if (!router.query.sort) router.query.sort = JSON.stringify({ createdAt: -1 });
        router.push({ query: { ...router.query } });
        updateUI();
    }, []);

    // update data on change of the parameters
    useEffect(() => {
        fetchdata();
    }, [_up]);

    // tigger the update of the data
    const updateUI = () => {
        _setUp(!_up);
    };

    // set the search value
    const setSearch = (s) => {
        search = s;
        _setSchtxt(s);
    };

    // set page
    const setPage = (page) => {
        router.query.page = page;
        router.push({ query: { ...router.query } });
        updateUI();
    };
    // set items per page
    const setPageSize = (pageSize) => {
        router.query.itemsperpage = pageSize;
        router.push({ query: { ...router.query } });
        updateUI();
    };
    // set sorting column
    const setSort = (sort) => {
        router.query.sort = sort;
        router.push({ query: { ...router.query } });
        updateUI();
    };
    // set searching field
    const setSearchField = (field) => {
        setSearch("");
        router.query.searchby = field;
        router.push({ query: { ...router.query } });
    };

    // data fetching main function
    const fetchdata = async () => {
        const res = await fetcher.get(
            buildSearchQuery(),
            requiredProps,
            true,
            false,
            router.query.itemsperpage,
            router.query.page - 1,
            router.query.sort ? JSON.parse(router.query.sort) : { createdAt: -1 },
            setLoading
        );
        if (res != null) {
            setSelectedData([]);
            setData(res.values);
            setTotal(res.count);
            setPages(Math.ceil(res.count / res.itemsperpage));
        }
    };

    // get search query according to the parameters
    const buildSearchQuery = () => {
        let query = {};
        if (search && search != "" && router.query.searchby) {
            if (router.query.searchby == "") {
                let tmpquery = {};
                for (let key in columns) {
                    if (columns[key].searchable && columns[key].multisearchable) tmpquery[columns[key].selector] = { $regex: search, $options: "i" };
                }
                query = { $or: [{ ...tmpquery }] };
            } else {
                for (let key in columns) {
                    if (columns[key].searchable) query[router.query.searchby] = { $regex: search, $options: "i" };
                }
            }
        }
        return query;
    };

    // get sorting icon according to the parameters to display in the table
    const getSortIcon = (column) => {
        if (!column.sortable || !router.query.sort) return <></>;
        if (router.query.sort.includes(column.selector) && router.query.sort.includes("-"))
            return (
                <SortAscendingIcon
                    className="h-5 w-5 text-gray-400 float-right"
                    aria-hidden="true"
                    onClick={() => {
                        setSort(JSON.stringify({ [column.selector]: 1 }));
                    }}
                />
            );
        else if (router.query.sort.includes(column.selector))
            return (
                <SortDescendingIcon
                    className="h-5 w-5 text-gray-400 float-right"
                    aria-hidden="true"
                    onClick={() => {
                        setSort(JSON.stringify({ createdAt: -1 }));
                    }}
                />
            );
        else
            return (
                <MinusIcon
                    className="h-5 w-5 text-gray-400 float-right"
                    aria-hidden="true"
                    onClick={() => {
                        setSort(JSON.stringify({ [column.selector]: -1 }));
                    }}
                />
            );
    };

    // select or unselect given row
    const selectItem = (item) => {
        if (selectedData.includes(item)) {
            setSelectedData(selectedData.filter((i) => i !== item));
        } else {
            setSelectedData([...selectedData, item]);
        }
    };
    // select or unselect all rows
    const selectUnselectAll = () => {
        if (selectedData.length == data.length) {
            setSelectedData([]);
        } else {
            setSelectedData(data.map((i) => i._id));
        }
    };
    // check if agiven row selected
    const isSelected = (item) => {
        return selectedData.includes(item);
    };

    // toggle the data update modal
    const _edit = async (item) => {
        const dta = await fetcher.getById(item._id, {}, setLoadingSingle);
        if (dta) {
            setEditingData(dta);
            setEditingOpen(true);
        }
    };

    // toggle the data delete modal
    const _delete = async (item) => {
        setSelectedData([item._id]);
        setDeletingOpen(true);
    };

    // update the data
    const updateRecord = async (item) => {
        const usr = await fetcher.update(item, false, setLoadingUpdate);
        if (usr) {
            setEditingOpen(false);
            updateUI();
        } else {
            alert("Failed To update User.");
        }
    };
    // delete the data
    const deleteRecord = async () => {
        const usr = await fetcher.removeBulk(selectedData, false, setLoadingDelete);
        if (usr) {
            setDeletingOpen(false);
            updateUI();
        } else {
            alert("Failed To Delete.");
        }
    };

    // goto previous page
    const gotoPreviousPage = () => {
        if (router.query.page > 1) {
            setPage(Number.parseInt(router.query.page) - 1);
        }
    };
    // goto next page
    const gotoNextPage = () => {
        if (router.query.page < pages) {
            setPage(Number.parseInt(router.query.page) + 1);
        }
    };

    // dismiss the data delete modal
    const deleteDismiss = (state) => {
        setDeletingOpen(state);
        setSelectedData([]);
    };

    // get approval status
    const getStatus = (status) => {
        switch (status) {
            case EApprovalState.default:
                return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"> Default </span>;
            case EApprovalState.pending:
                return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"> Pending </span>;
            case EApprovalState.reviewing:
                return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-cyan-100 text-cyan-800"> Reviewing </span>;
            case EApprovalState.rejected:
                return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-100 text-pink-800"> Rejected </span>;
            case EApprovalState.blocked:
                return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"> Blocked </span>;
            case EApprovalState.approved:
                return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"> Approved </span>;
        }
    };
    const getBooleanStatus = (status) => {
        switch (status) {
            case true:
                return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"> Yes </span>;
            case false:
                return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"> No </span>;
        }
    };

    // actions

    const updateStatus = async () => {
        if (!Object.keys(EApprovalState).includes(updatingStatus)) {
            alert("Please Select Status to Update!");
            return;
        }
        const dta = await fetcher.updateProps({ _id: { $in: selectedData } }, { status: EApprovalState[updatingStatus] }, false, setLoadingUpdate);
        if (dta) {
            setShowStatusUpdate(false);
            setUpdatingStatus("");
            updateUI();
        } else {
            alert("Failed To update Data.");
        }
    };

    return (
        <>
            <div className="rounded-md border border-gray-200 shadow-sm">
                <div className="flex flex-col">
                    <div className="flex flex-row justify-between mx-5 my-4 font-normal text-sm">
                        <div className="w-1/2 flex md:justify-start sm:justify-center text-gray-600">
                            <div>
                                <label className="font-bold mr-3">Results : </label>
                                <select
                                    className="mt-1 pl-3 pr-10 py-2 text-sm border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                    onChange={(e) => setPageSize(e.target.value)}
                                    value={router.query.itemsperpage}
                                >
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                    <option value="50">50</option>
                                    <option value="100">100</option>
                                </select>
                            </div>
                        </div>
                        <div className="w-1/2 flex md:justify-end sm:justify-center text-gray-600">
                            <div className="mt-1 relative rounded-md shadow-sm w-full">
                                <div className="absolute inset-y-0 left-0 flex items-center">
                                    <label className="sr-only">Search Property</label>
                                    <select
                                        className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-3 pr-7 text-sm border-transparent bg-transparent font-bold text-gray-800 rounded-md"
                                        onChange={(e) => setSearchField(e.target.value)}
                                        value={router.query.searchby}
                                    >
                                        <option value="" defaultValue={true}>
                                            Default
                                        </option>
                                        {columns.map(
                                            (column) =>
                                                !column.exclude &&
                                                column.searchable && (
                                                    <option value={column.selector} key={column.name}>
                                                        {column.name}
                                                    </option>
                                                )
                                        )}
                                    </select>
                                </div>
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        if (search && search != "" && router.query.search != search) {
                                            router.query.search = search;
                                            setPage(1);
                                        }
                                    }}
                                >
                                    <input
                                        type="text"
                                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-32 text-sm border-gray-300 rounded-md"
                                        placeholder="Search..."
                                        value={_schtxt}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                    <button className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none" type="submit">
                                        <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row justify-between mx-5 mt-0 my-4 font-normal text-sm">
                        <div className=" flex flex-wrap text-gray-600">
                            <div>
                                <label className="font-bold mr-3">Actons : </label>
                                {selectActions.map(
                                    (action) =>
                                        (action.alwaysVisible || (action.single && selectedData.length == 1) || (action.multi && selectedData.length >= 1)) && action.button()
                                )}
                                {router.query.search && router.query.searchby && (
                                    <button
                                        type="button"
                                        className="float-right inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none "
                                        onClick={() => {
                                            router.query.search = "";
                                            router.query.searchby = "";
                                            setSearch("");
                                            setPage(1);
                                        }}
                                    >
                                        Clear Seach <XIcon className="ml-2 h-5 w-5" aria-hidden="true" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 overflow-x-auto">
                        <table className="min-w-full divide-y whitespace-nowrap">
                            <thead>
                                <tr>
                                    <th className="pl-5 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                        <div className="flex items-center justify-center">
                                            <input
                                                type="checkbox"
                                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                                onChange={() => selectUnselectAll()}
                                                checked={selectedData.length == data.length}
                                            />
                                        </div>
                                    </th>
                                    {columns.map((column) => (
                                        <th
                                            key={column.selector}
                                            className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            {column.name} {getSortIcon(column)}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {loading &&
                                    Array(2)
                                        .fill(1)
                                        .map((_, index) => (
                                            <tr className="animate-pulse" key={index}>
                                                {columns.map((column) => (
                                                    <td key={column.selector} className="px-6 py-3 whitespace-no-wrap border-b border-gray-200">
                                                        <div className="h-2 bg-gray-300 rounded"></div>
                                                    </td>
                                                ))}
                                                <td className="px-6 py-3 whitespace-no-wrap border-b border-gray-200">
                                                    <div className="h-2 bg-gray-300 rounded"></div>
                                                </td>
                                            </tr>
                                        ))}
                                {!loading &&
                                    data &&
                                    data.length > 0 &&
                                    data.map((item, index) => {
                                        return (
                                            <tr key={index} className="text-gray-600">
                                                <td className="pl-5 py-2 whitespace-no-wrap border-b border-gray-200">
                                                    <div className="flex items-center justify-center">
                                                        <input
                                                            type="checkbox"
                                                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                                            onChange={() => selectItem(item._id)}
                                                            checked={isSelected(item._id)}
                                                        />
                                                    </div>
                                                </td>
                                                <td className="px-6 py-2 whitespace-no-wrap border-b border-gray-200">
                                                    <div className="text-sm leading-5 text-gray-900">{index + 1}</div>
                                                </td>
                                                <td className="px-6 py-2 whitespace-no-wrap border-b border-gray-200">
                                                    <div className="text-sm leading-5">{item.name}</div>
                                                </td>
                                                <td className="px-6 py-2 whitespace-no-wrap border-b border-gray-200">
                                                    <div className="text-sm leading-5">{item.category}</div>
                                                </td>
                                                <td className="px-6 py-2 whitespace-no-wrap border-b border-gray-200">
                                                    <div className="text-sm leading-5">{getBooleanStatus(item.featured)}</div>
                                                </td>
                                                <td className="px-6 py-2 whitespace-no-wrap border-b border-gray-200">
                                                    <div className="text-sm leading-5">{getBooleanStatus(item.draft)}</div>
                                                </td>
                                                <td className="px-6 py-2 whitespace-no-wrap border-b border-gray-200">
                                                    <div className="text-sm leading-5">{getStatus(item.status)}</div>
                                                </td>
                                                <td className="px-6 py-2 whitespace-no-wrap border-b border-gray-200 text-right text-sm leading-5 font-medium">
                                                    <div className="flex items-center justify-center">
                                                        <button
                                                            className="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:shadow-outline"
                                                            onClick={() => _edit(item)}
                                                        >
                                                            <PencilIcon className="h-5 w-5" aria-hidden="true" />
                                                        </button>
                                                        <button
                                                            className="text-red-600 hover:text-red-900 focus:outline-none focus:shadow-outline ml-4"
                                                            onClick={() => _delete(item)}
                                                        >
                                                            <TrashIcon className="h-5 w-5" aria-hidden="true" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                {!loading && data && data.length === 0 && (
                                    <tr className="text-gray-600">
                                        <td colSpan={columns.length + 1} className="px-6 py-2 whitespace-no-wrap border-b font-medium border-gray-200 text-center">
                                            No Records To Display!
                                        </td>
                                    </tr>
                                )}
                                <tr>
                                    <th className="pl-5 py-3  text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider">
                                        <div className="flex items-center justify-center">
                                            <input
                                                type="checkbox"
                                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                                onChange={() => selectUnselectAll()}
                                                checked={selectedData.length == data.length}
                                            />
                                        </div>
                                    </th>
                                    {columns.map((column) => (
                                        <th key={column.name} className="px-6 py-3  text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider">
                                            {column.name}
                                        </th>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="flex flex-row justify-between mx-5 my-4 font-normal text-sm">
                        <div className="w-1/2 flex md:justify-start sm:justify-center text-gray-600">
                            <div className="rounded-md border border-gray-200 text-sm font-medium text-indigo-500 px-4 py-2">
                                Showing page {router.query.page} of {pages}. {total} total records.
                            </div>
                        </div>
                        {pages > 0 && (
                            <div className="w-1/2 flex md:justify-end sm:justify-center">
                                <div className="flex gap-2 px-1">
                                    <button className="rounded-full p-2 w-9 border border-gray-200  text-sm text-gray-500" onClick={gotoPreviousPage}>
                                        <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
                                    </button>
                                    {Array(pages)
                                        .fill(1)
                                        .map((_, index) => (
                                            <button
                                                key={index}
                                                className={`rounded-full p-2 w-9 border border-gray-200  text-sm  ${
                                                    router.query.page == index + 1 ? "bg-indigo-500 text-white" : "bg-gray-100 text-gray-500"
                                                }`}
                                                onClick={() => setPage(index + 1)}
                                            >
                                                <span className="font-semibold">{index + 1}</span>
                                            </button>
                                        ))}
                                    <button className="rounded-full p-2 w-9 border border-gray-200  text-sm text-gray-500" onClick={gotoNextPage}>
                                        <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <SidePanel title={`Edit News Post '${editingData?._id}'`} setOpen={setEditingOpen} isOpen={editingOpen}>
                {editingData && (
                    <Add
                        data={editingData}
                        edit={true}
                        onSubmit={updateRecord}
                        onCancel={() => {
                            setEditingOpen(false);
                        }}
                    />
                )}
            </SidePanel>
            <Modal open={deletingOpen} setOpen={deleteDismiss}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                            <ExclamationIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                        </div>
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                Delete selected records?
                            </Dialog.Title>
                            <div className="mt-2">
                                <p className="text-sm text-gray-500">Are you sure you want to delete the selected records? This action cannot be undone.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                        type="button"
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={() => deleteRecord()}
                    >
                        Delete
                    </button>
                    <button
                        type="button"
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={() => deleteDismiss(false)}
                    >
                        Cancel
                    </button>
                </div>
            </Modal>
            <Modal
                open={showStatusUpdate}
                setOpen={(st) => {
                    setShowStatusUpdate(st);
                    setUpdatingStatus("");
                }}
            >
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-cyan-100 sm:mx-0 sm:h-10 sm:w-10">
                            <ExclamationIcon className="h-6 w-6 text-cyan-600" aria-hidden="true" />
                        </div>
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                Update Record Status?
                            </Dialog.Title>
                            <div className="mt-2">
                                <p className="text-sm text-gray-500">Are you sure you want to update status of the selected records?</p>
                            </div>
                            <div className="mt-2">
                                <Listbox value={updatingStatus} onChange={setUpdatingStatus}>
                                    {({ open }) => (
                                        <>
                                            <Listbox.Label className="block text-sm font-medium text-gray-700">Status : </Listbox.Label>
                                            <div className="mt-1 relative">
                                                <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                                    <span className="block truncate">{updatingStatus}</span>
                                                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                        {/* <ChevronUpDown className="h-5 w-5 text-gray-400" ariaHidden="true"></ChevronUpDown> */}
                                                    </span>
                                                </Listbox.Button>

                                                <Transition show={open} as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                                                    <Listbox.Options className="absolute mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm z-50">
                                                        {Object.keys(EApprovalState)
                                                            .filter((x) => !/^[0-9]+$/.test(x))
                                                            .map((val) => (
                                                                <Listbox.Option
                                                                    key={val}
                                                                    className={({ active }) =>
                                                                        classNames(
                                                                            active ? "text-white bg-indigo-600" : "text-gray-900",
                                                                            "cursor-default select-none relative py-2 pl-8 pr-4"
                                                                        )
                                                                    }
                                                                    value={val}
                                                                >
                                                                    {({ selected, active }) => (
                                                                        <>
                                                                            <span className={classNames(selected ? "font-semibold" : "font-normal", "block truncate")}>{val}</span>

                                                                            {selected ? (
                                                                                <span
                                                                                    className={classNames(
                                                                                        active ? "text-white" : "text-indigo-600",
                                                                                        "absolute inset-y-0 left-0 flex items-center pl-1.5"
                                                                                    )}
                                                                                >
                                                                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                                </span>
                                                                            ) : null}
                                                                        </>
                                                                    )}
                                                                </Listbox.Option>
                                                            ))}
                                                    </Listbox.Options>
                                                </Transition>
                                            </div>
                                        </>
                                    )}
                                </Listbox>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                        disabled={!updatingStatus || updatingStatus == ""}
                        type="button"
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-cyan-600 text-base font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={() => updateStatus()}
                    >
                        Update
                    </button>
                    <button
                        type="button"
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={() => {
                            setShowStatusUpdate(false);
                            setUpdatingStatus("");
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </Modal>
        </>
    );
};
export default Datatable;
