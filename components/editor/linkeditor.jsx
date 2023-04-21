/*    Imports    */

import CLink from "../../types/classes/_common/CLink";
import { TrashIcon, ClipboardCopyIcon } from "@heroicons/react/solid";
import { useState } from "react";

const LinkEditor = (props) => {
    const [data, setData] = useState(props.data || []);
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");

    // submit data to server
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (props.readonly == true) return;
        if (props.max && data.length >= props.max) {
            alert("Max record count exceded! Remove a record to continue.");
            return;
        }
        if (title.length < 3) {
            alert("Title is too short");
            return;
        }
        // check if url is valid
        if (!url.match(/^(http|https):\/\/[^ "]+$/)) {
            alert("Invalid url");
            return;
        }
        props?.onSubmit([...data, { name: title, url: url }]);
        setData([...data, { name: title, url: url }]);
        setTitle("");
        setUrl("");
    };

    return (
        <div className={`bg-white shadow overflow-hidden rounded-md border border-gray-200 ${props.className}`}>
            <ul role="list" className="divide-y divide-gray-200">
                <li className="px-6 py-4">
                    <div className="flex gap-2">
                        <div className="basis-4/12">
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                Title
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    placeholder="facebook"
                                />
                            </div>

                        </div>
                        <div className="basis-7/12">

                            <label htmlFor="url" className="block text-sm font-medium text-gray-700">
                                URL
                            </label>

                            <div className="mt-1">
                                <input
                                    type="text"
                                    name="url"
                                    id="url"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    placeholder="https://example.com"
                                />
                            </div>

                        </div>
                        <div className="basis-1/12">
                            <button
                                onClick={handleSubmit}
                                type="submit"
                                className="inline-flex items-center justify-center mt-6 w-full px-3 py-2 border border-indigo-700 text-sm leading-4 font-medium rounded-md shadow-sm text-indigo-700 bg-white focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500"
                            >
                                Add
                            </button>

                        </div>
                    </div>
                </li>
                {data.map((item, index) => (
                    <li key={index} className="px-6 py-4 flex-1 flex items-center justify-between">
                        <div className="">
                            <p className="text-base font-semibold">{item.name}</p>
                            <a href={item.url} className="text-sm text-indigo-700 hover:text-indigo-500">
                                {item.url}
                            </a>
                        </div>

                        <div className="relative flex gap-2">
                            {/* copy link to clipboard */}
                            <button
                                type="button"
                                onClick={() => {
                                    navigator.clipboard.writeText(item.url);
                                }}
                                className="inline-flex items-center justify-center w-full px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-green-700 bg-white hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-green-500"
                            >
                                <ClipboardCopyIcon className="w-5 h-5" />
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    if (props.readonly == true) return;
                                    setData(data.filter((_, i) => i !== index));
                                    props?.onSubmit(data.filter((_, i) => i !== index));
                                }}
                                className="inline-flex items-center justify-center w-full px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-red-500"
                            >
                                <TrashIcon className="w-5 h-5" />
                            </button>

                        </div>
                    </li>
                ))}
                {data.length === 0 && (
                    <li className="px-6 py-4">
                        
                        <div className="text-center text-gray-500">
                            <p className="text-sm">You don&apos;t have any links yet.</p>
                            <p className="text-sm">Add one by clicking the button above.</p>
                        </div>

                    </li>
                )}
            </ul>
        </div>
    );
};

export default LinkEditor;
