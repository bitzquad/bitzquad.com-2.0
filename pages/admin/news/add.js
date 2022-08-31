import * as React from "react";
import request from "../../../middleware/request";
import { useRouter } from "next/router";

const newsCategory = ["Company News", "Business", "Entertainment", "Health", "Science", "Sports", "Technology", "World"];

const Add = () => {
    const router = useRouter();

    const [title, setTitle] = React.useState("");
    const [content, setContent] = React.useState("");
    const [thumbnail, setThumbnail] = React.useState("");
    const [category, setCategory] = React.useState("");

    const handleImage = (e) => {
        try {
            let file = e.target.files[0];
            var reader = new FileReader();
            reader.onloadend = function () {
                setThumbnail(reader.result);
            };
            reader.readAsDataURL(file);
        } catch {}
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const resp = await request.Post("/api/news", {
            title,
            content,
            thumbnail,
            category,
            writer: {
                name: "Bitzquad",
                title: "Bitzquad Company",
                thumbnail: "https://bitzquad.com/static/images/logo.webp",
            },
        });
        if (resp.status === 200 && resp.data.status == 200) {
            alert("News Added");
            clear();
            router.push("?tab=1");
        } else {
            alert("Error: failed to add news : " + resp.data.data.error);
        }
    };
    const clear = () => {
        setTitle("");
        setContent("");
        setThumbnail("");
        setCategory("");
    };

    return (
        <form className="space-y-8 divide-y divide-gray-200" onSubmit={handleSubmit}>
            <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                <div className="space-y-6 sm:space-y-5 ">
                    <div>
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Post News Article</h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">Add news article to display on the website.</p>
                    </div>
                    <div className="space-y-6 sm:space-y-5">
                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="Title" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Title
                            </label>
                            <div className="mt-1 sm:col-span-2 sm:mt-0">
                                <input
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    type="text"
                                    name="Title"
                                    id="Title"
                                    autoComplete="Title"
                                    className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="post" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Post
                            </label>
                            <div className="mt-1 sm:col-span-2 sm:mt-0">
                                <textarea
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    id="post"
                                    name="post"
                                    rows={8}
                                    className="block w-full max-w-lg rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    defaultValue={""}
                                />
                                <p className="mt-2 text-sm text-gray-500">Write news article here.</p>
                            </div>
                        </div>

                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="cat" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Category
                            </label>
                            <div className="mt-1 sm:col-span-2 sm:mt-0">
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    id="cat"
                                    name="cat"
                                    className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                >
                                    {newsCategory.map((cat, index) => (
                                        <option key={index}>{cat}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="cover-photo" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Thumbnail
                            </label>
                            <div className="mt-1 sm:col-span-2 sm:mt-0">
                                <div className="flex max-w-lg justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                                    <div className="space-y-1 text-center">
                                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                            <path
                                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        <div className="flex text-sm text-gray-600">
                                            <label
                                                htmlFor="file-upload"
                                                className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                                            >
                                                <span>Upload a file</span>
                                                <input id="file-upload" name="file-upload" type="file" onChange={handleImage} className="sr-only" />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="pt-5">
                <div className="flex justify-end">
                    <button
                        onClick={clear}
                        type="button"
                        className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Save
                    </button>
                </div>
            </div>
        </form>
    );
};
export default Add;
