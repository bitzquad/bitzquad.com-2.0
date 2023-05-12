/*    Imports    */
import { useState, useEffect, useRef } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/solid";

import dynamic from "next/dynamic";
import CNews from "../../../types/classes/news/CNews";
import filehandler from "../../../constants/filehandler";

import collectionfetcher from "../../../constants/fetch/collection";

import LinkEditor from "../../../components/editor/linkeditor";

// import ck editor using dynamic import on client side
const CKEditor = dynamic(
    {
        loader: () => import("@ckeditor/ckeditor5-react").then((mod) => mod.CKEditor),
        render: (props, CKEditor) => {
            const edt = new CKEditor();
            console.log("Props : ", props);
            return edt;
        },
    },
    {
        ssr: false,
    }
);

// form component
const Add = (props) => {
    // form state object
    const [dataObj, setDataObj] = useState(props.data || new CNews());
    const [errors, setErrors] = useState({}); // errors object
    const [_collections, _setCollections] = useState(); // collections object

    const [thumbnail, setThumbnail] = useState(null);
    const [thumblstup, setThumblstup] = useState(null);

    // ckeditor state object and props
    const editorRef = useRef();
    const pageRef = useRef();
    const [editorLoaded, setEditorLoaded] = useState(false);
    const { ClassicEditor } = editorRef.current || {};
    useEffect(() => {
        editorRef.current = {
            ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
        };
        setEditorLoaded(true);
        getCollections();
    }, []);

    // get required collections
    const getCollections = async () => {
        if (_collections == null) _setCollections(await collectionfetcher.getCollections(["newscategory"], () => {}));
    };

    // get required collection values
    const getCollectionValues = (key) => {
        if (_collections == null) return [];
        const res = _collections.find((x) => x.key == key);
        if (res == null) return [];
        return res.values;
    };

    // handle upload thumbnail
    const handleImage = async (e) => {
        try {
            if (!e.target.files || e.target.files.length == 0) {
                alert("No file selected.");
                return;
            }
            let file = e.target.files[0];
            if (file.type.indexOf("image") == -1) {
                alert("Please select an image file.");
                return;
            }
            if (file.size > 1024 * 1024 * 2) {
                alert("Image size must be less than 2MB");
                return;
            }
            var reader = new FileReader();
            reader.onloadend = function () {
                setThumbnail(reader.result);
            };
            reader.readAsDataURL(file);
            const key = dataObj._id || Date.now();
            const imgok = await filehandler.uploadNewsThumbnail(key, file);
            if (imgok) {
                if (dataObj._id && dataObj.thumbnail.src && !dataObj.thumbnail.src.includes(dataObj._id)) {
                    filehandler.remove(dataObj.thumbnail.src);
                }
                setThumblstup(Date.now());
                handleChange({ target: { name: "thumbnail.src", value: `news/np-${key}.png` } });
            } else {
                alert("Image upload failed.");
            }
        } catch (er) {
            console.log(er);
            alert("Error uploading image.");
        }
    };

    // handle change of input fields
    const handleChange = (e) => {
        if (props.readOnlyProps && props.readOnlyProps.includes(e.target.name)) return;

        const paras = e.target.name.split(".");
        const value = e.target.value;

        if (paras.length === 1) setDataObj({ ...dataObj, [paras[0]]: value });
        else if (paras.length === 2) setDataObj({ ...dataObj, [paras[0]]: { ...dataObj[paras[0]], [paras[1]]: value } });
        else if (paras.length === 3) setDataObj({ ...dataObj, [paras[0]]: { ...dataObj[paras[0]], [paras[1]]: { ...dataObj[paras[0]][paras[1]], [paras[2]]: value } } });
    };

    // check if all required fields are filled and vaild
    const validate = (mode = 0) => {
        let _errors = { name: {} };
        let isValid = true;

        // Draft
        if (mode <= 10) {
            if (!dataObj.name || dataObj.name?.length < 3) {
                _errors.name = "Post title is required";
                isValid = false;
            } else _errors.name = "";
        }
        if (mode <= 9) {
            if (!dataObj.description || dataObj.description.length < 10) {
                _errors.description = "Post description is required";
                isValid = false;
            } else _errors.description = "";
            if (!dataObj.content || dataObj.content.length < 10) {
                _errors.content = "Post content is required";
                isValid = false;
            } else _errors.content = "";
        }
        console.log("Errors", _errors);
        setErrors(_errors);
        return isValid;
    };

    // submit data to server
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("News : ", dataObj);
        const check = validate();
        if (check) {
            props?.onSubmit(dataObj);
        } else {
            pageRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };
    // reset data
    const clear = () => {
        setDataObj(new CNews());
    };

    // set styles for input fields
    const getInputSytle = (error) => {
        return !error || error === ""
            ? "block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
            : "block w-full shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm border-red-300 rounded-md";
    };
    // get error message for input fields
    const getErrorStyle = (error) => {
        if (error && error !== "")
            return (
                <div className="mt-2 pr-3 flex items-center pointer-events-none">
                    <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                    <p className="ml-2 text-sm text-red-600">{error}</p>
                </div>
            );
    };
    // get if the input field is readonly
    const getReadOnly = (name) => {
        if (props.readOnlyProps && props.readOnlyProps.includes(name)) return true;
        return false;
    };

    return (
        <form className="space-y-8 divide-y divide-gray-200" onSubmit={handleSubmit} ref={pageRef}>
            <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                <div>
                    <div>
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Basic Information</h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">This information will be displayed publicly so be careful what you share.</p>
                    </div>

                    <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Title <span className="text-red-500">*</span>
                            </label>
                            <div className="relative mt-1 sm:mt-0 sm:col-span-2">
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    autoComplete="given-name"
                                    placeholder="About Latest Technology and News"
                                    className={getInputSytle(errors.name)}
                                    value={dataObj.name}
                                    onChange={handleChange}
                                    readOnly={getReadOnly("name")}
                                />
                                {getErrorStyle(errors.name)}
                            </div>
                        </div>
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                News Description <span className="text-red-500">*</span>
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                <textarea
                                    id="description"
                                    name="description"
                                    rows={3}
                                    className={getInputSytle(errors.description)}
                                    defaultValue={dataObj.description}
                                    onChange={handleChange}
                                    readOnly={getReadOnly("description")}
                                />
                                <p className="mt-2 text-sm text-gray-500">Write a few sentences about news.</p>
                                {getErrorStyle(errors.description)}
                            </div>
                        </div>
                        {editorLoaded && (
                            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                <label htmlFor="pcontent" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                    News Article Content <span className="text-red-500">*</span>
                                </label>
                                <div className="mt-1 sm:mt-0 sm:col-span-2">
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={dataObj.content || "<p>Your content...</p>"}
                                        config={{
                                            toolbar: ["heading", "|", "bold", "italic", "link", "bulletedList", "numberedList", "blockQuote", "undo", "redo", "insertTable"],
                                        }}
                                        onReady={(editor) => {}}
                                        onChange={(event, editor) => {
                                            const edata = editor.getData();
                                            handleChange({ target: { name: "content", value: edata } });
                                        }}
                                    />
                                    <p className="mt-2 text-sm text-gray-500">Your news article content.</p>
                                    {getErrorStyle(errors.content)}
                                </div>
                            </div>
                        )}
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="cover-photo" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                News Thumbnail / Banner <span className="text-red-500">*</span>
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                <div className="max-w-lg flex justify-center pb-6 rounded-md">
                                    {dataObj.thumbnail && dataObj.thumbnail.src && (
                                        <img
                                            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${dataObj._id || "news"}${thumblstup}?key=${dataObj.thumbnail.src}`}
                                            alt="News banner"
                                            className="h-full w-full rounded-md"
                                        />
                                    )}
                                    {(!dataObj.thumbnail || !dataObj.thumbnail.src) && thumbnail && <img src={thumbnail} alt="News banner" className="h-full w-full rounded-md" />}
                                </div>
                                <div className="max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
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
                                                className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                            >
                                                <span>Upload a file</span>
                                                <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleImage} accept="image/png, image/jpeg" />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 2MB</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
                    <div>
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Other Information</h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">This information will be displayed publicly so be careful what you share.</p>
                    </div>

                    <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Category <span className="text-red-500">*</span>
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                <select
                                    id="category"
                                    name="category"
                                    autoComplete="category"
                                    className={getInputSytle(errors.category)}
                                    value={dataObj.category}
                                    onChange={handleChange}
                                    readOnly={getReadOnly("category")}
                                >
                                    <option selected disabled>
                                        Select Category
                                    </option>
                                    {getCollectionValues("newscategory").map((v) => (
                                        <option key={v.key} value={v.value}>
                                            {v.value}
                                        </option>
                                    ))}
                                </select>
                                {getErrorStyle(errors.nationality)}
                            </div>
                        </div>

                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="social" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Media Links
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                <LinkEditor
                                    data={dataObj.social}
                                    onSubmit={(v) => {
                                        handleChange({ target: { name: "social", value: v } });
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="pt-5">
                <div className="flex justify-end">
                    <button
                        onClick={() => {
                            props?.onCancel();
                        }}
                        type="button"
                        className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Save
                    </button>
                </div>
            </div>
        </form>
    );
};
export default Add;
