/*    Imports    */
import { useState, useRef } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/solid";

import CCollection from "../../../types/classes/collection/CCollection";

const AddValue = (props) => {
    // form state object
    const [dataObj, setDataObj] = useState(props?.data || {});
    const [errors, setErrors] = useState({}); // errors object

    const pageRef = useRef();

    // check if all required fields are filled and vaild
    const validate = (mode = 0) => {
        let _errors = {};
        let isValid = true;

        // Draft
        if (mode <= 10) {
            if (!dataObj.key) {
                _errors.key = "Key is required";
                isValid = false;
            } // check if key is unique
            else if (props?.data == null && props.collection.values.find((item) => item.key === dataObj.key)) {
                _errors.key = "Key is already in use";
                isValid = false;
            } else errors.key = "";

            if (!dataObj.value) {
                _errors.value = "Value is required";
                isValid = false;
            } else _errors.value = "";
        }
        console.log("Errors", _errors);
        setErrors(_errors);
        return isValid;
    };

    const handleKeyChange = (e) => {
        const { value } = e.target;
        if (props?.collection?.valuesameaskey == true) {
            setDataObj({ ...dataObj, key: value, value: value });
        } else {
            setDataObj({ ...dataObj, key: value });
        }
    };
    const handleValueChange = (e) => {
        const { value } = e.target;
        setDataObj({ ...dataObj, value: value });
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
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Key Value Pair Details</h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">This information will be displayed publicly so be careful what you share.</p>
                    </div>

                    <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="key" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Key
                            </label>
                            <div className="relative mt-1 sm:mt-0 sm:col-span-2">
                                <input
                                    type="text"
                                    name="key"
                                    id="key"
                                    placeholder="ABC Text"
                                    className={getInputSytle(errors.key)}
                                    value={dataObj.key}
                                    onChange={handleKeyChange}
                                    readOnly={getReadOnly("key")}
                                />
                                {getErrorStyle(errors.key)}
                            </div>
                        </div>
                        {props?.collection?.valuesameaskey == false && (
                            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                <label htmlFor="Value" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                    Value
                                </label>
                                <div className="relative mt-1 sm:mt-0 sm:col-span-2">
                                    <input
                                        type={props?.collection.valuetype}
                                        name="Value"
                                        id="Value"
                                        className={getInputSytle(errors.value)}
                                        value={dataObj.value}
                                        onChange={handleValueChange}
                                        readOnly={getReadOnly("value")}
                                    />
                                    {getErrorStyle(errors.value)}
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
export default AddValue;
