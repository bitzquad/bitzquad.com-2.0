/*    Imports    */
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";

import { ExclamationCircleIcon } from "@heroicons/react/solid";

import dynamic from "next/dynamic";
import CUser from "../../../types/classes/user/CUser";
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
    const router = useRouter();
    // form state object
    const [dataObj, setDataObj] = useState(props.data || new CUser());
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
        if (_collections == null)
            _setCollections(await collectionfetcher.getCollections(["usergender", "userethnicity", "usercommunity", "usernationality", "countries"], () => {}));
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
            if (file.size > 1024 * 1024) {
                alert("Image size must be less than 1MB");
                return;
            }
            var reader = new FileReader();
            reader.onloadend = function () {
                setThumbnail(reader.result);
            };
            reader.readAsDataURL(file);
            const key = dataObj._id || Date.now();
            const imgok = await filehandler.uploadProfilePicture(key, file);
            if (imgok) {
                if (dataObj._id && dataObj.thumbnail.src && !dataObj.thumbnail.src.includes(dataObj._id)) {
                    filehandler.remove(dataObj.thumbnail.src);
                }
                setThumblstup(Date.now());
                handleChange({ target: { name: "thumbnail.src", value: `users/usr-${key}.png` } });
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
            if (!dataObj.email?.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)) {
                _errors.email = "Email is invalid";
                isValid = false;
            } else _errors.email = "";
        }
        if (mode <= 9) {
            if (dataObj.name) {
                if (!dataObj.name.first || dataObj.name.first?.length < 3) {
                    _errors.name.first = "First name is too short";
                    isValid = false;
                } else _errors.name.first = "";

                if (!dataObj.name.last || dataObj.name.last?.length < 3) {
                    _errors.name.last = "Last name is too short";
                    isValid = false;
                } else _errors.name.last = "";
            } else {
                _errors.name.first = "First name is required";
                _errors.name.last = "Last name is required";
                isValid = false;
            }

            if (dataObj.gender == 0) {
                _errors.gender = "Select gender";
                isValid = false;
            } else _errors.gender = "";
        }
        console.log("Errors", _errors);
        setErrors(_errors);
        return isValid;
    };

    // submit data to server
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("User : ", dataObj);
        const check = validate();
        if (check) {
            props?.onSubmit(dataObj);
        } else {
            pageRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };
    // reset data
    const clear = () => {
        setDataObj(new CUser());
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
                            <label htmlFor="name.first" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                First name
                            </label>
                            <div className="relative mt-1 sm:mt-0 sm:col-span-2">
                                <input
                                    type="text"
                                    name="name.first"
                                    id="name.first"
                                    autoComplete="given-name"
                                    placeholder="John"
                                    className={getInputSytle(errors.name?.first)}
                                    value={dataObj.name?.first}
                                    onChange={handleChange}
                                    readOnly={getReadOnly("name.first")}
                                />
                                {getErrorStyle(errors.name?.first)}
                            </div>
                        </div>

                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="name.last" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Last name
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                <input
                                    type="text"
                                    name="name.last"
                                    id="name.last"
                                    autoComplete="family-name"
                                    placeholder="Doe"
                                    className={getInputSytle(errors.name?.last)}
                                    value={dataObj.name?.last}
                                    onChange={handleChange}
                                    readOnly={getReadOnly("name.last")}
                                />
                                {getErrorStyle(errors.name?.last)}
                            </div>
                        </div>

                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Email address
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    placeholder="john@example.com"
                                    className={getInputSytle(errors.email)}
                                    value={dataObj.email}
                                    onChange={handleChange}
                                    readOnly={getReadOnly("email")}
                                />
                                {getErrorStyle(errors.email)}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
                    <div>
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Personal Information</h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">This information will be displayed publicly so be careful what you share.</p>
                    </div>

                    <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="gender" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Gender
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                <select
                                    id="gender"
                                    name="gender"
                                    className={getInputSytle(errors.gender)}
                                    onChange={handleChange}
                                    value={dataObj.gender}
                                    readOnly={getReadOnly("gender")}
                                >
                                    <option selected disabled>
                                        Select Gender
                                    </option>
                                    {getCollectionValues("usergender").map((v) => (
                                        <option key={v.key} value={v.value}>
                                            {v.value}
                                        </option>
                                    ))}
                                </select>
                                {getErrorStyle(errors.gender)}
                            </div>
                        </div>

                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="dob" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Birth Date
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                <input
                                    id="dob"
                                    name="dob"
                                    type="date"
                                    autoComplete="date-of-birth"
                                    placeholder="dd/mm/yyyy"
                                    className={getInputSytle(errors.dob)}
                                    value={dataObj.dob}
                                    onChange={handleChange}
                                    readOnly={getReadOnly("dob")}
                                />
                                {getErrorStyle(errors.dob)}
                            </div>
                        </div>

                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Contact Number
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                <input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    autoComplete="phone"
                                    placeholder="+1 (555) 555-5555"
                                    className={getInputSytle(errors.phone)}
                                    value={dataObj.phone}
                                    onChange={handleChange}
                                    readOnly={getReadOnly("phone")}
                                />
                                {getErrorStyle(errors.phone)}
                            </div>
                        </div>

                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="address.country" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Country
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                <select
                                    id="address.country"
                                    name="address.country"
                                    autoComplete="country-name"
                                    className={getInputSytle(errors.address?.country)}
                                    value={dataObj.address?.country}
                                    onChange={handleChange}
                                    readOnly={getReadOnly("address.country")}
                                >
                                    <option selected disabled>
                                        Select Country
                                    </option>
                                    {getCollectionValues("countries").map((v) => (
                                        <option key={v.key} value={v.value}>
                                            {v.value}
                                        </option>
                                    ))}
                                </select>
                                {getErrorStyle(errors.address?.country)}
                            </div>
                        </div>

                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="address.street" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Street address
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                <input
                                    type="text"
                                    name="address.street"
                                    id="address.street"
                                    autoComplete="street-address"
                                    className={getInputSytle(errors.address?.street)}
                                    value={dataObj.address?.street}
                                    onChange={handleChange}
                                    readOnly={getReadOnly("address.street")}
                                />
                                {getErrorStyle(errors.address?.street)}
                            </div>
                        </div>

                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="address.city" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                City
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                <input
                                    type="text"
                                    name="address.city"
                                    id="address.city"
                                    autoComplete="address-level2"
                                    className={getInputSytle(errors.address?.city)}
                                    value={dataObj.address?.city}
                                    onChange={handleChange}
                                    readOnly={getReadOnly("address.city")}
                                />
                                {getErrorStyle(errors.address?.city)}
                            </div>
                        </div>

                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="address.state" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                State / Province
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                <input
                                    type="text"
                                    name="address.state"
                                    id="address.state"
                                    autoComplete="address-level1"
                                    className={getInputSytle(errors.address?.state)}
                                    value={dataObj.address?.state}
                                    onChange={handleChange}
                                    readOnly={getReadOnly("address.state")}
                                />
                                {getErrorStyle(errors.address?.state)}
                            </div>
                        </div>

                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="address.zip" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                ZIP / Postal code
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                <input
                                    type="text"
                                    name="address.zip"
                                    id="address.zip"
                                    autoComplete="postal-code"
                                    className={getInputSytle(errors.address?.zip)}
                                    value={dataObj.address?.zip}
                                    onChange={handleChange}
                                    readOnly={getReadOnly("address.zip")}
                                />
                                {getErrorStyle(errors.address?.zip)}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
                    <div>
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Profile Content</h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500"> Add some content to your profile. </p>
                    </div>
                    <div className="space-y-6 sm:space-y-5">
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                About
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
                                <p className="mt-2 text-sm text-gray-500">Write a few sentences about yourself.</p>
                                {getErrorStyle(errors.description)}
                            </div>
                        </div>
                        {editorLoaded && (
                            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                <label htmlFor="pcontent" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                    Profile Content
                                </label>
                                <div className="mt-1 sm:mt-0 sm:col-span-2">
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={dataObj.content || "<p>Your Profile content...</p>"}
                                        config={{
                                            toolbar: ["heading", "|", "bold", "italic", "link", "bulletedList", "numberedList", "blockQuote", "undo", "redo", "insertTable"],
                                        }}
                                        onReady={(editor) => {}}
                                        onChange={(event, editor) => {
                                            const edata = editor.getData();
                                            handleChange({ target: { name: "content", value: edata } });
                                        }}
                                    />
                                    <p className="mt-2 text-sm text-gray-500">Your Profile content.</p>
                                    {getErrorStyle(errors.content)}
                                </div>
                            </div>
                        )}

                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
                                Profile Picture
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                <div className="flex items-center">
                                    <span className="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                                        {dataObj.thumbnail && dataObj.thumbnail.src && (
                                            <img
                                                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${dataObj._id || "user"}${thumblstup}?key=${dataObj.thumbnail.src}`}
                                                alt="Profile Picture"
                                                className="h-full w-full"
                                            />
                                        )}
                                        {(!dataObj.thumbnail || !dataObj.thumbnail.src) && thumbnail ? (
                                            <img src={thumbnail} alt="Profile Picture" className="h-full w-full" />
                                        ) : (
                                            <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                            </svg>
                                        )}
                                    </span>
                                    <input type="file" id="photo" name="photo" className="hidden" onChange={handleImage} accept="image/png, image/jpeg" />
                                    <label
                                        htmlFor="photo"
                                        type="button"
                                        className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Change
                                    </label>
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
                            <label htmlFor="nationality" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Nationality
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                <select
                                    id="nationality"
                                    name="nationality"
                                    autoComplete="nationality"
                                    className={getInputSytle(errors.nationality)}
                                    value={dataObj.nationality}
                                    onChange={handleChange}
                                    readOnly={getReadOnly("nationality")}
                                >
                                    <option selected disabled>
                                        Select Nationality
                                    </option>
                                    {getCollectionValues("usernationality").map((v) => (
                                        <option key={v.key} value={v.value}>
                                            {v.value}
                                        </option>
                                    ))}
                                </select>
                                {getErrorStyle(errors.nationality)}
                            </div>
                        </div>
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="ethnicity" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Ethnicity
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                <select
                                    id="ethnicity"
                                    name="ethnicity"
                                    autoComplete="ethnicity"
                                    className={getInputSytle(errors.ethnicity)}
                                    value={dataObj.ethnicity}
                                    onChange={handleChange}
                                    readOnly={getReadOnly("ethnicity")}
                                >
                                    <option value="" selected>
                                        Select Ethnicity
                                    </option>
                                    {getCollectionValues("userethnicity").map((v) => (
                                        <option key={v.key} value={v.value}>
                                            {v.value}
                                        </option>
                                    ))}
                                </select>
                                {getErrorStyle(errors.ethnicity)}
                            </div>
                        </div>
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="community" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Community
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                <select
                                    id="community"
                                    name="community"
                                    autoComplete="community"
                                    className={getInputSytle(errors.community)}
                                    value={dataObj.community}
                                    onChange={handleChange}
                                    readOnly={getReadOnly("community")}
                                >
                                    <option value="" selected>
                                        Select Community
                                    </option>
                                    {getCollectionValues("usercommunity").map((v) => (
                                        <option key={v.key} value={v.value}>
                                            {v.value}
                                        </option>
                                    ))}
                                </select>
                                {getErrorStyle(errors.community)}
                            </div>
                        </div>
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="social" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Social Media Links
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
