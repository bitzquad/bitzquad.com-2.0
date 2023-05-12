/*    Imports    */
import { useState, useEffect, useRef } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/solid";
import CContact from "../../../types/classes/contact/CContact";

//import collectionfetcher from "../../../constants/fetch/collection";

// form component
const Add = (props) => {
    // form state object
    const [dataObj, setDataObj] = useState(props.data || new CContact());
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
        //getCollections();
    }, []);

    // get required collections
    // const getCollections = async () => {
    //     if (_collections == null) _setCollections(await collectionfetcher.getCollections(["jobcategory", "countries"], () => {}));
    // };

    // get required collection values
    // const getCollectionValues = (key) => {
    //     if (_collections == null) return [];
    //     const res = _collections.find((x) => x.key == key);
    //     if (res == null) return [];
    //     return res.values;
    // };

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
        let _errors = { time: {} };
        let isValid = true;

        // Draft
        if (mode <= 10) {
            // if (!dataObj.name || dataObj.name?.length < 3) {
            //     _errors.name = "Recruit title is required";
            //     isValid = false;
            // } else _errors.name = "";
        }
        console.log("Errors", _errors);
        setErrors(_errors);
        return isValid;
    };

    // submit data to server
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Recruit : ", dataObj);
        const check = validate();
        if (check) {
            props?.onSubmit(dataObj);
        } else {
            pageRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };
    // reset data
    const clear = () => {
        setDataObj(new CContact());
    };

    // set styles for input fields
    const getInputSytle = (error) => {
        return !error || error === "" ? "block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md" : "block w-full shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm border-red-300 rounded-md";
    };
    // get error message for input fields
    const getErrorStyle = (error) => {
        if (error && error !== "")
            return (
                <div className="pointer-events-none mt-2 flex items-center pr-3">
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

    // convert string date to date object
    const getDate = (strdate) => {
        return new Date(strdate).getDate();
    };

    return (
        <form className="space-y-8 divide-y divide-gray-200" onSubmit={handleSubmit} ref={pageRef}>
            <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                <div>
                    <div>
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Basic Information</h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">This information will be displayed publicly so be careful what you share.</p>
                    </div>

                    <div className="mt-6 space-y-6 sm:mt-5 sm:space-y-5">
                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Title
                            </label>
                            <div className="relative mt-1 sm:col-span-2 sm:mt-0">
                                <input type="text" name="title" id="title" placeholder="Reason for the request" className={getInputSytle(errors.title)} value={dataObj.title} onChange={handleChange} readOnly={getReadOnly("title")} />
                                {getErrorStyle(errors.title)}
                            </div>
                        </div>
                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Message
                            </label>
                            <div className="mt-1 sm:col-span-2 sm:mt-0">
                                <textarea id="message" name="message" rows={10} className={getInputSytle(errors.message)} defaultValue={dataObj.message} onChange={handleChange} readOnly={getReadOnly("message")} />
                                {/* <p className="mt-2 text-sm text-gray-500">Write a few sentences about event.</p> */}
                                {getErrorStyle(errors.message)}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="space-y-6 pt-8 sm:space-y-5 sm:pt-10">
                    <div>
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Requester Information</h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">This information will be displayed publicly so be careful what you share.</p>
                    </div>

                    <div className="mt-6 space-y-6 sm:mt-5 sm:space-y-5">
                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="name.first" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Name
                            </label>
                            <div className="relative mt-1 sm:col-span-2 sm:mt-0">
                                <input type="text" name="name.first" id="name.first" autoComplete="given-name" placeholder="John" className={getInputSytle(errors.name?.first)} value={dataObj.name?.first} onChange={handleChange} readOnly={getReadOnly("name.first")} />
                                {getErrorStyle(errors.name?.first)}
                            </div>
                        </div>

                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Email address
                            </label>
                            <div className="mt-1 sm:col-span-2 sm:mt-0">
                                <input id="email" name="email" type="email" autoComplete="email" placeholder="john@example.com" className={getInputSytle(errors.email)} value={dataObj.email} onChange={handleChange} readOnly={getReadOnly("email")} />
                                {getErrorStyle(errors.email)}
                            </div>
                        </div>
                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Contact Number
                            </label>
                            <div className="mt-1 sm:col-span-2 sm:mt-0">
                                <input id="phone" name="phone" type="tel" autoComplete="phone" placeholder="+1 (555) 555-5555" className={getInputSytle(errors.phone)} value={dataObj.phone} onChange={handleChange} readOnly={getReadOnly("phone")} />
                                {getErrorStyle(errors.phone)}
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
                        className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Cancel
                    </button>
                    <button type="submit" className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        Save
                    </button>
                </div>
            </div>
        </form>
    );
};
export default Add;
