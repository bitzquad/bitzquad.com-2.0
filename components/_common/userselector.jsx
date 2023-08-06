/*    Imports    */
import { TrashIcon, ClipboardCopyIcon } from "@heroicons/react/solid";
import { useState } from "react";
import fetcher from "../../constants/fetch/user";

const UserSelector = (props) => {
    const [data, setData] = useState(props.data || []);
    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [fetching, setFetching] = useState(false);

    // submit data to server
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (props.readonly == true) return;
        console.log("max : ", props.max, "data : ", data);
        if (props.max && data.length >= props.max) {
            console.log(data);
            alert("Max record count exceded! Remove a record to continue.");
            return;
        }

        if (id.length < 3) {
            alert("Invalid Id");
            return;
        }
        // if (name.length < 3) {
        //     alert("Name is too short");
        //     return;
        // }
        // if (position.length < 2) {
        //     alert("Position is required");
        //     return;
        // }
        // if (!thumbnail || !thumbnail.src) {
        //     alert("Picture is required");
        //     return;
        // }
        // // check if url is valid
        // if (!url.match(/^(http|https):\/\/[^ "]+$/)) {
        //     alert("Invalid url");
        //     return;
        // }
        const usr = await fetcher.getById_Public(id, { name: 1, email: 1, thumbnail: 1 }, setFetching);
        if (usr) {
            props?.onSubmit([...data, { id: usr._id, name: `${usr.name.first} ${usr.name.last}`, thumbnail: usr.thumbnail, email: usr.email, phone: usr.phone }]);
            setData([...data, { id: usr._id, name: `${usr.name.first} ${usr.name.last}`, thumbnail: usr.thumbnail, email: usr.email, phone: usr.phone }]);
            setId("");
            setName("");
        } else {
            alert("No User Found");
        }
    };

    return (
        <div className={`bg-white shadow overflow-hidden rounded-md border border-gray-200 ${props.className}`}>
            <ul role="list" className="divide-y divide-gray-200">
                <li className="px-6 py-4">
                    <div className="flex gap-2">
                        <div className="basis-10/12">
                            <label htmlFor="id" className="block text-sm font-medium text-gray-700">
                                User ID
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    name="id"
                                    id="id"
                                    value={id}
                                    onChange={(e) => setId(e.target.value)}
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    placeholder="User Id"
                                />
                            </div>
                        </div>
                        {/* <div className="basis-4/12">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Name
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    placeholder="Jhon Doe"
                                />
                            </div>
                        </div> */}
                        <div className="basis-1/12">
                            <button
                                disabled={fetching}
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
                        <div className="flex flex-row gap-x-5">
                            <span className="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                                <img src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${item.name}?key=${item.thumbnail?.src}`} alt="Profile Picture" className="h-full w-full" />
                            </span>
                            <div>
                                <p className="text-base font-semibold">{item.name}</p>
                                <span className="inline-flex gap-x-3">
                                    <p className="text-sm text-indigo-700 hover:text-indigo-500">{item.email}</p>
                                    <p className="text-sm text-green-700 hover:text-green-500">{item.phone}</p>
                                </span>
                            </div>
                        </div>
                        <div className="relative flex gap-2">
                            {/* copy link to clipboard */}
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
                            <p className="text-sm">No user added yet.</p>
                            <p className="text-sm">Add one by clicking the button above.</p>
                        </div>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default UserSelector;
