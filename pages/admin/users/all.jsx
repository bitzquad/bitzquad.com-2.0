/*    Imports    */

import { Dialog, Listbox, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { SearchIcon, SortAscendingIcon, SortDescendingIcon, MinusIcon, PencilIcon, TrashIcon, ArrowLeftIcon, ArrowRightIcon, ExclamationIcon, XIcon, PlusIcon, UploadIcon, CheckIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";

import fetcher from "../../../constants/fetch/user";

import dynamic from "next/dynamic";
const Add = dynamic(() => import("./add"));
const Modal = dynamic(() => import("../../../components/_common/modal"));
const SidePanel = dynamic(() => import("../../../components/_common/sidepanel"));
import EUsertype from "../../../types/enum/_common/EUsertype";

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
        name: "Name",
        selector: "name.first",
        searchable: true,
        multisearchable: true,
        sortable: true,
        exclude: false,
    },
    {
        name: "Email",
        selector: "email",
        searchable: true,
        multisearchable: true,
        sortable: true,
        exclude: false,
    },
    {
        name: "Phone",
        selector: "phone",
        searchable: true,
        multisearchable: true,
        sortable: true,
        exclude: false,
    },
    {
        name: "DoB",
        selector: "dob",
        searchable: true,
        multisearchable: true,
        sortable: true,
        exclude: false,
    },
    {
        name: "Jobs",
        selector: "jobcount.count",
        searchable: false,
        multisearchable: false,
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
    const requiredProps = { name: 1, email: 1, phone: 1, dob: 1, jobcount: 1, status: 1 };

    // data select actions
    const selectActions = [
        {
            alwaysVisible: true,
            single: true,
            multi: false,
            button: () => (
                <button
                    type="button"
                    className="mr-2 inline-flex items-center rounded-md border border-transparent bg-green-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-green-700 focus:outline-none "
                    onClick={() => {
                        router.push("?tab=2");
                    }}
                >
                    Add User <PlusIcon className="ml-2 h-5 w-5" aria-hidden="true" />
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
                    className="mr-2 inline-flex items-center rounded-md border border-transparent bg-teal-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-teal-700 focus:outline-none "
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
                    className="mr-2 inline-flex items-center rounded-md border border-transparent bg-red-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-red-700 focus:outline-none "
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
        const res = await fetcher.get(buildSearchQuery(), requiredProps, true, false, router.query.itemsperpage, router.query.page - 1, router.query.sort ? JSON.parse(router.query.sort) : { createdAt: -1 }, setLoading);
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
                    className="float-right h-5 w-5 text-gray-400"
                    aria-hidden="true"
                    onClick={() => {
                        setSort(JSON.stringify({ [column.selector]: 1 }));
                    }}
                />
            );
        else if (router.query.sort.includes(column.selector))
            return (
                <SortDescendingIcon
                    className="float-right h-5 w-5 text-gray-400"
                    aria-hidden="true"
                    onClick={() => {
                        setSort(JSON.stringify({ createdAt: -1 }));
                    }}
                />
            );
        else
            return (
                <MinusIcon
                    className="float-right h-5 w-5 text-gray-400"
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
            alert("Failed To updateUI User.");
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

    // convert string date to date object
    const getDate = (strdate) => {
        const date = new Date(strdate);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    };

    // get approval status
    const getStatus = (status) => {
        switch (status) {
            case EUsertype.default:
                return <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800"> Default </span>;
            case EUsertype.signed:
                return <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800"> Signed </span>;
            case EUsertype.regular:
                return <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800"> Regular </span>;
            case EUsertype.verified:
                return <span className="inline-flex items-center rounded-full bg-cyan-100 px-2.5 py-0.5 text-xs font-medium text-cyan-800"> Verified </span>;
            case EUsertype.promod:
                return <span className="inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800"> Pro Mod </span>;
            case EUsertype.pro:
                return <span className="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800"> Pro </span>;
            case EUsertype.adminmod:
                return <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800"> Admin Mod </span>;
            case EUsertype.admin:
                return <span className="inline-flex items-center rounded-full bg-pink-100 px-2.5 py-0.5 text-xs font-medium text-pink-800"> Admin </span>;
            case EUsertype.superadmin:
                return <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800"> Super Admin </span>;

            // blog & news

            case EUsertype.blogwriter:
                return <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-cyan-800"> Blog Writer </span>;
            case EUsertype.newswriter:
                return <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-cyan-800"> News Writer </span>;
            case EUsertype.blogadmin:
                return <span className="inline-flex items-center rounded-full bg-pink-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800"> Blog Admin </span>;
            case EUsertype.newsadmin:
                return <span className="inline-flex items-center rounded-full bg-pink-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800"> News Admin </span>;
            case EUsertype.blognewsadmin:
                return <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-green-800"> Blog News Admin </span>;
        }
    };
    // actions

    const updateStatus = async () => {
        if (!Object.keys(EUsertype).includes(updatingStatus)) {
            alert("Please Select Status to Update!");
            return;
        }
        const dta = await fetcher.updateProps({ _id: { $in: selectedData } }, { status: EUsertype[updatingStatus] }, false, setLoadingUpdate);
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
                    <div className="mx-5 my-4 flex flex-row justify-between text-sm font-normal">
                        <div className="flex w-1/2 text-gray-600 sm:justify-center md:justify-start">
                            <div>
                                <label className="mr-3 font-bold">Results : </label>
                                <select className="mt-1 rounded-md border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" onChange={(e) => setPageSize(e.target.value)} value={router.query.itemsperpage}>
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                    <option value="50">50</option>
                                    <option value="100">100</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex w-1/2 text-gray-600 sm:justify-center md:justify-end">
                            <div className="relative mt-1 w-full rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 flex items-center">
                                    <label className="sr-only">Search Property</label>
                                    <select className="h-full rounded-md border-transparent bg-transparent py-0 pl-3 pr-7 text-sm font-bold text-gray-800 focus:border-indigo-500 focus:ring-indigo-500" onChange={(e) => setSearchField(e.target.value)} value={router.query.searchby}>
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
                                    <input type="text" className="block w-full rounded-md border-gray-300 pl-32 text-sm focus:border-indigo-500 focus:ring-indigo-500" placeholder="Search..." value={_schtxt} onChange={(e) => setSearch(e.target.value)} />
                                    <button className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3" type="submit">
                                        <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="mx-5 my-4 mt-0 flex flex-row justify-between text-sm font-normal">
                        <div className=" flex flex-wrap text-gray-600">
                            <div>
                                <label className="mr-3 font-bold">Actons : </label>
                                {selectActions.map((action) => (action.alwaysVisible || (action.single && selectedData.length == 1) || (action.multi && selectedData.length >= 1)) && action.button())}
                                {router.query.search && router.query.searchby && (
                                    <button
                                        type="button"
                                        className="float-right inline-flex items-center rounded-md border border-transparent bg-yellow-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-yellow-700 focus:outline-none "
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
                                    <th className="border-b border-gray-200 bg-gray-50 py-3 pl-5 text-left text-xs font-medium uppercase leading-4 tracking-wider text-gray-500">
                                        <div className="flex items-center justify-center">
                                            <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" onChange={() => selectUnselectAll()} checked={selectedData.length == data.length} />
                                        </div>
                                    </th>
                                    {columns.map((column) => (
                                        <th key={column.selector} className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase leading-4 tracking-wider text-gray-500">
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
                                                    <td key={column.selector} className="whitespace-no-wrap border-b border-gray-200 px-6 py-3">
                                                        <div className="h-2 rounded bg-gray-300"></div>
                                                    </td>
                                                ))}
                                                <td className="whitespace-no-wrap border-b border-gray-200 px-6 py-3">
                                                    <div className="h-2 rounded bg-gray-300"></div>
                                                </td>
                                            </tr>
                                        ))}
                                {!loading &&
                                    data &&
                                    data.length > 0 &&
                                    data.map((item, index) => {
                                        return (
                                            <tr key={index} className="text-gray-600">
                                                <td className="whitespace-no-wrap border-b border-gray-200 py-2 pl-5">
                                                    <div className="flex items-center justify-center">
                                                        <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" onChange={() => selectItem(item._id)} checked={isSelected(item._id)} />
                                                    </div>
                                                </td>
                                                <td className="whitespace-no-wrap border-b border-gray-200 px-6 py-2">
                                                    <div className="text-sm leading-5 text-gray-900">{index + 1}</div>
                                                </td>
                                                <td className="whitespace-no-wrap border-b border-gray-200 px-6 py-2">
                                                    <div className="text-sm leading-5">
                                                        {item.name.first} {item.name.last}
                                                    </div>
                                                </td>
                                                <td className="whitespace-no-wrap border-b border-gray-200 px-6 py-2">
                                                    <div className="text-sm leading-5">{item.email}</div>
                                                </td>
                                                <td className="whitespace-no-wrap border-b border-gray-200 px-6 py-2">
                                                    <div className="text-sm leading-5">{item.phone}</div>
                                                </td>
                                                <td className="whitespace-no-wrap border-b border-gray-200 px-6 py-2">
                                                    <div className="text-sm leading-5">{getDate(new Date(item.dob))}</div>
                                                </td>
                                                <td className="whitespace-no-wrap border-b border-gray-200 px-6 py-2">
                                                    <div className="text-sm leading-5">
                                                        {item.jobcount?.count || 0} / {item.jobcount?.max || 0}
                                                    </div>
                                                </td>
                                                <td className="whitespace-no-wrap border-b border-gray-200 px-6 py-2">
                                                    <div className="text-sm leading-5">{getStatus(item.status)}</div>
                                                </td>
                                                <td className="whitespace-no-wrap border-b border-gray-200 px-6 py-2 text-right text-sm font-medium leading-5">
                                                    <div className="flex items-center justify-center">
                                                        <button className="focus:shadow-outline text-indigo-600 hover:text-indigo-900 focus:outline-none" onClick={() => _edit(item)}>
                                                            <PencilIcon className="h-5 w-5" aria-hidden="true" />
                                                        </button>
                                                        <button className="focus:shadow-outline ml-4 text-red-600 hover:text-red-900 focus:outline-none" onClick={() => _delete(item)}>
                                                            <TrashIcon className="h-5 w-5" aria-hidden="true" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                {!loading && data && data.length === 0 && (
                                    <tr className="text-gray-600">
                                        <td colSpan={columns.length + 1} className="whitespace-no-wrap border-b border-gray-200 px-6 py-2 text-center font-medium">
                                            No Records To Display!
                                        </td>
                                    </tr>
                                )}
                                <tr>
                                    <th className="py-3 pl-5  text-left text-xs font-medium uppercase leading-4 tracking-wider text-gray-700">
                                        <div className="flex items-center justify-center">
                                            <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" onChange={() => selectUnselectAll()} checked={selectedData.length == data.length} />
                                        </div>
                                    </th>
                                    {columns.map((column) => (
                                        <th key={column.name} className="px-6 py-3  text-left text-xs font-medium uppercase leading-4 tracking-wider text-gray-700">
                                            {column.name}
                                        </th>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="mx-5 my-4 flex flex-row justify-between text-sm font-normal">
                        <div className="flex w-1/2 text-gray-600 sm:justify-center md:justify-start">
                            <div className="rounded-md border border-gray-200 px-4 py-2 text-sm font-medium text-indigo-500">
                                Showing page {router.query.page} of {pages}. {total} total records.
                            </div>
                        </div>
                        {pages > 0 && (
                            <div className="flex w-1/2 sm:justify-center md:justify-end">
                                <div className="flex gap-2 px-1">
                                    <button className="w-9 rounded-full border border-gray-200 p-2  text-sm text-gray-500" onClick={gotoPreviousPage}>
                                        <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
                                    </button>
                                    {Array(pages)
                                        .fill(1)
                                        .map((_, index) => (
                                            <button key={index} className={`w-9 rounded-full border border-gray-200 p-2  text-sm  ${router.query.page == index + 1 ? "bg-indigo-500 text-white" : "bg-gray-100 text-gray-500"}`} onClick={() => setPage(index + 1)}>
                                                <span className="font-semibold">{index + 1}</span>
                                            </button>
                                        ))}
                                    <button className="w-9 rounded-full border border-gray-200 p-2  text-sm text-gray-500" onClick={gotoNextPage}>
                                        <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <SidePanel title={`Edit User '${editingData?._id}'`} setOpen={setEditingOpen} isOpen={editingOpen}>
                {editingData && (
                    <Add
                        data={editingData}
                        edit={true}
                        readOnlyProps={["email"]}
                        onSubmit={updateRecord}
                        onCancel={() => {
                            setEditingOpen(false);
                        }}
                    />
                )}
            </SidePanel>
            <Modal open={deletingOpen} setOpen={deleteDismiss}>
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                            <ExclamationIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                        </div>
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                            <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                Delete selected records?
                            </Dialog.Title>
                            <div className="mt-2">
                                <p className="text-sm text-gray-500">Are you sure you want to delete the selected records? This action cannot be undone.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button type="button" className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm" onClick={() => deleteRecord()}>
                        Delete
                    </button>
                    <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:mt-0 sm:w-auto sm:text-sm" onClick={() => deleteDismiss(false)}>
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
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-cyan-100 sm:mx-0 sm:h-10 sm:w-10">
                            <ExclamationIcon className="h-6 w-6 text-cyan-600" aria-hidden="true" />
                        </div>
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                            <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
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
                                            <div className="relative mt-1">
                                                <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                                                    <span className="block truncate">{updatingStatus}</span>
                                                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">{/* <ChevronUpDown className="h-5 w-5 text-gray-400" ariaHidden="true"></ChevronUpDown> */}</span>
                                                </Listbox.Button>

                                                <Transition show={open} as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                                                    <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                        {Object.keys(EUsertype)
                                                            .filter((x) => !/^[0-9]+$/.test(x))
                                                            .map((val) => (
                                                                <Listbox.Option key={val} className={({ active }) => classNames(active ? "bg-indigo-600 text-white" : "text-gray-900", "relative cursor-default select-none py-2 pl-8 pr-4")} value={val}>
                                                                    {({ selected, active }) => (
                                                                        <>
                                                                            <span className={classNames(selected ? "font-semibold" : "font-normal", "block truncate")}>{val}</span>

                                                                            {selected ? (
                                                                                <span className={classNames(active ? "text-white" : "text-indigo-600", "absolute inset-y-0 left-0 flex items-center pl-1.5")}>
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
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button disabled={!updatingStatus || updatingStatus == ""} type="button" className="inline-flex w-full justify-center rounded-md border border-transparent bg-cyan-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm" onClick={() => updateStatus()}>
                        Update
                    </button>
                    <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 sm:ml-3 sm:mt-0 sm:w-auto sm:text-sm"
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
