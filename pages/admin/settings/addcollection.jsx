/*    Imports    */
import { useState, useRef } from "react";
import { useRouter } from "next/router";

import { ExclamationCircleIcon } from "@heroicons/react/solid";

import CCollection from "../../../types/classes/collection/CCollection";

// form component
const Add = (props) => {
    const router = useRouter();
    // form state object
    const [dataObj, setDataObj] = useState(props.data || new CCollection());
    const [errors, setErrors] = useState({}); // errors object

    const pageRef = useRef();

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
        let _errors = {};
        let isValid = true;

        // Draft
        if (mode <= 10) {
            if (!dataObj.name || dataObj.name?.length < 3) {
                _errors.name = "Name is too short";
                isValid = false;
            } else _errors.name = "";

            if (!dataObj.key || dataObj.key?.length < 3) {
                _errors.key = "Key is too short";
                isValid = false;
            }
            // check if key contains only lowercase alphanumeric characters and no spaces
            else if (!/^[a-z0-9]+$/.test(dataObj.key)) {
                _errors.key = "Key contains invalid characters. Only lowercase alphanumeric characters are allowed";
                isValid = false;
            }
            // check if key is unique
            else if (props.collections.find((c) => c.key === dataObj.key)) {
                _errors.key = "Key is already in use";
                isValid = false;
            } else _errors.key = "";

            if (!dataObj.valuetype && dataObj?.valuesameaskey == false) {
                _errors.valuetype = "Value type is required";
                isValid = false;
            } else _errors.valuetype = "";
        }
        console.log("Errors", _errors);
        setErrors(_errors);
        return isValid;
    };

    // submit data to server
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Collection : ", dataObj);
        const check = validate();
        if (check) {
            props?.onSubmit(dataObj);
        } else {
            pageRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };
    // reset data
    const clear = () => {
        setDataObj(new CCollection());
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
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Collection Information</h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">This information will be displayed publicly so be careful what you share.</p>
                    </div>

                    <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Name
                            </label>
                            <div className="relative mt-1 sm:mt-0 sm:col-span-2">
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="User gender"
                                    className={getInputSytle(errors.name)}
                                    value={dataObj.name}
                                    onChange={handleChange}
                                    readOnly={getReadOnly("name")}
                                />
                                {getErrorStyle(errors.name)}
                            </div>
                        </div>
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="key" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Key
                            </label>
                            <div className="relative mt-1 sm:mt-0 sm:col-span-2">
                                <input
                                    type="text"
                                    name="key"
                                    id="key"
                                    placeholder="user_gender"
                                    className={getInputSytle(errors.key)}
                                    value={dataObj.key}
                                    onChange={handleChange}
                                    readOnly={getReadOnly("key")}
                                />
                                {getErrorStyle(errors.key)}
                            </div>
                        </div>

                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="valuesameaskey" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Value Same As Key
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                <select
                                    id="valuesameaskey"
                                    name="valuesameaskey"
                                    autoComplete="valuesameaskey"
                                    className={getInputSytle(errors.valuesameaskey)}
                                    onChange={handleChange}
                                    value={dataObj.valuesameaskey}
                                    readOnly={getReadOnly("valuesameaskey")}
                                >
                                    <option defaultValue={true} disabled>
                                        Select
                                    </option>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                                </select>
                                {getErrorStyle(errors.valuesameaskey)}
                            </div>
                        </div>
                        {dataObj?.valuesameaskey == "false" && (
                            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                <label htmlFor="valuetype" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                    Value Type
                                </label>
                                <div className="mt-1 sm:mt-0 sm:col-span-2">
                                    <select
                                        id="valuetype"
                                        name="valuetype"
                                        autoComplete="valuetype"
                                        className={getInputSytle(errors.valuetype)}
                                        onChange={handleChange}
                                        value={dataObj.valuetype}
                                        readOnly={getReadOnly("valuetype")}
                                    >
                                        <option selected disabled>
                                            Select
                                        </option>
                                        <option value={"text"}>text</option>
                                        <option value={"number"}>number</option>
                                    </select>
                                    {getErrorStyle(errors.valuetype)}
                                </div>
                            </div>
                        )}
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
                        className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                        Save
                    </button>
                </div>
            </div>
        </form>
    );
};
export default Add;
