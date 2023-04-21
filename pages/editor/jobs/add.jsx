/*    Imports    */
import { useState, useEffect, useRef } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/solid";

import dynamic from "next/dynamic";
import CJob from "../../../types/classes/job/CJob";
import filehandler from "../../../constants/filehandler";

import fetcher from "../../../constants/fetch/job";
import collectionfetcher from "../../../constants/fetch/collection";
// import companyfetcher from "../../../constants/fetch/companies";

import LinkEditor from "../../../components/editor/linkeditor";
// import Companyselector from "../../../components/_common/companyselector";

//notifications
import { NotificationContainer, NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";

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
    const [dataObj, setDataObj] = useState(props.data || new CJob());
    const [errors, setErrors] = useState({}); // errors object
    const [_collections, _setCollections] = useState(); // collections object
    const [_quality, _setQuality] = useState(0);
    const [_companies, _setCompanies] = useState([]);

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
        // getCompanies();
    }, []);

    const getCompanies = async () => {
        // const comp = await companyfetcher.getMyCompanies({}, { company: 1 }, false, false, 100000, 0, { "company.name": -1 }, () => {});
        // if (comp) _setCompanies(comp.values.map((v) => v.company));
    };

    // get required collections
    const getCollections = async () => {
        if (_collections == null) _setCollections(await collectionfetcher.getCollections(["jobcategory", "jobtype", "jobworkplace", "jobseniority", "jobindustry", "jobexperiencelevel", "jobeducationlevel", "currencies", "countries"], () => {}));
    };

    // get required collection values
    const getCollectionValues = (key) => {
        if (_collections == null) return [];
        const res = _collections.find((x) => x.key == key);
        if (res == null) return [];
        return res.values;
    };

    // useEffect(() => {
    //     if (props.data) {
    //         setDataObj(props.data);
    //     }
    // }, [props.data]);

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
            const imgok = await filehandler.uploadJobThumbnail(key, file);
            if (imgok) {
                if (dataObj._id && dataObj.thumbnail.src && !dataObj.thumbnail.src.includes(dataObj._id)) {
                    filehandler.remove(dataObj.thumbnail.src);
                }
                setThumblstup(Date.now());
                handleChange({
                    target: { name: "thumbnail.src", value: `jobs/job-${key}.png` },
                });
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
        else if (paras.length === 2)
            setDataObj({
                ...dataObj,
                [paras[0]]: { ...dataObj[paras[0]], [paras[1]]: value },
            });
        else if (paras.length === 3)
            setDataObj({
                ...dataObj,
                [paras[0]]: {
                    ...dataObj[paras[0]],
                    [paras[1]]: { ...dataObj[paras[0]][paras[1]], [paras[2]]: value },
                },
            });
    };

    // check if all required fields are filled and vaild
    const validate = (mode = 0) => {
        let _errors = { name: {} };
        let isValid = true;

        // Draft
        if (mode <= 10) {
            if (!dataObj.name || dataObj.name?.length < 3) {
                _errors.name = "Job title is required";
                isValid = false;
            } else _errors.name = "";
        }
        if (mode <= 9) {
            if (!dataObj.description || dataObj.description.length < 10) {
                _errors.description = "Job description is required";
                isValid = false;
            } else _errors.description = "";
            if (!dataObj.content || dataObj.content.length < 10) {
                _errors.content = "Job content is required";
                isValid = false;
            } else _errors.content = "";
            if (!dataObj.candidatescount || dataObj.candidatescount <= 0) {
                _errors.candidatescount = "Candidate count must grater than or equal to 1";
                isValid = false;
            } else _errors.candidatescount = "";
            if (!dataObj.company || !dataObj.company.id || dataObj.company.id.length < 5) {
                _errors.company = "Please select a company";
                isValid = false;
            } else _errors.company = "";
        }
        console.log("Errors", _errors);
        setErrors(_errors);
        return isValid;
    };

    // submit data to server
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Job : ", dataObj);
        const check = validate();
        if (check) {
            props?.onSubmit(dataObj);
        } else {
            pageRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };
    // reset data
    const clear = () => {
        setDataObj(new CJob());
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

    const checkQuality = async () => {
        if (dataObj.content && dataObj.content.length > 70) {
            const res = await fetcher.check_Public(dataObj.content, () => {});
            if (res.quality <= 100) {
                _setQuality(res.quality);
                if (res.quality > 50) {
                    NotificationManager.success(res.explanation, "(" + res.result + ")");
                } else {
                    NotificationManager.warning(res.explanation, "(" + res.result + ")");
                }
            } else {
                alert("Failed to check job!");
            }
        } else alert("Job post content is not enough");
    };

    const getQualityStatus = (quality) => {
        if (quality > 90) return <span className="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800"> Excellent </span>;
        if (quality > 80) return <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800"> Good </span>;
        if (quality > 70) return <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800"> Moderate </span>;
        return <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800"> Not Good </span>;
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
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Title <span className="text-red-500">*</span>
                            </label>
                            <div className="relative mt-1 sm:col-span-2 sm:mt-0">
                                <input type="text" name="name" id="name" autoComplete="given-name" placeholder="Full-Stack Developer" className={getInputSytle(errors.name)} value={dataObj.name} onChange={handleChange} readOnly={getReadOnly("name")} />
                                {getErrorStyle(errors.name)}
                            </div>
                        </div>
                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Job Description <span className="text-red-500">*</span>
                            </label>
                            <div className="mt-1 sm:col-span-2 sm:mt-0">
                                <textarea id="description" name="description" rows={3} className={getInputSytle(errors.description)} defaultValue={dataObj.description} onChange={handleChange} readOnly={getReadOnly("description")} />
                                <p className="mt-2 text-sm text-gray-500">Write a few sentences about job.</p>
                                {getErrorStyle(errors.description)}
                            </div>
                        </div>
                        {editorLoaded && (
                            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                                <label htmlFor="pcontent" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                    Job Article Content <span className="text-red-500">*</span>
                                </label>
                                <div className="mt-1 sm:col-span-2 sm:mt-0">
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={dataObj.content || "<p>Your content...</p>"}
                                        config={{
                                            toolbar: ["heading", "|", "bold", "italic", "link", "bulletedList", "numberedList", "blockQuote", "undo", "redo", "insertTable"],
                                        }}
                                        onReady={(editor) => {}}
                                        onChange={(event, editor) => {
                                            const edata = editor.getData();
                                            handleChange({
                                                target: { name: "content", value: edata },
                                            });
                                        }}
                                    />
                                    <p className="mt-2 text-sm text-gray-500">Your job article content.</p>
                                    {getErrorStyle(errors.content)}
                                </div>
                            </div>
                        )}
                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Job Ranking Quality <span className="text-red-500">*</span>
                            </label>
                            <div className="mt-1 sm:col-span-2 sm:mt-0">
                                <div className="flex max-w-lg justify-between rounded-md pb-6">
                                    <div>{getQualityStatus(_quality || dataObj.quality)}</div>
                                    <button type="button" onClick={checkQuality} className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                        Check
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="company" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Company <span className="text-red-500">*</span>
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                <Companyselector
                                    max={1}
                                    readOnly={getReadOnly("company")}
                                    data={[dataObj.company]}
                                    companies={_companies}
                                    onSubmit={(v) => {
                                        if (v.length > 0) handleChange({ target: { name: "company", value: v[0] } });
                                    }}
                                />
                                {getErrorStyle(errors.company)}
                            </div>
                        </div> */}
                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="cover-photo" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Job Thumbnail / Banner <span className="text-red-500">*</span>
                            </label>
                            <div className="mt-1 sm:col-span-2 sm:mt-0">
                                <div className="flex max-w-lg justify-center rounded-md pb-6">
                                    {dataObj.thumbnail && dataObj.thumbnail.src && <img src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${dataObj._id || "job"}${thumblstup}?key=${dataObj.thumbnail.src}`} alt="Job banner" className="h-full w-full rounded-md" />}
                                    {(!dataObj.thumbnail || !dataObj.thumbnail.src) && thumbnail && <img src={thumbnail} alt="Job banner" className="h-full w-full rounded-md" />}
                                </div>
                                <div className="flex max-w-lg justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                                    <div className="space-y-1 text-center">
                                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <div className="flex text-sm text-gray-600">
                                            <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500">
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
                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="vacent" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Vacent
                            </label>
                            <div className="mt-1 sm:col-span-2 sm:mt-0">
                                <select id="vacent" name="vacent" className={getInputSytle(errors.vacent)} value={dataObj.vacent} onChange={handleChange} readOnly={getReadOnly("vacent")}>
                                    <option defaultValue={""}>Select</option>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                                </select>
                                {getErrorStyle(errors.vacent)}
                            </div>
                        </div>
                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="urgent" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Hiring Urgently
                            </label>
                            <div className="mt-1 sm:col-span-2 sm:mt-0">
                                <select id="urgent" name="urgent" className={getInputSytle(errors.urgent)} value={dataObj.urgent} onChange={handleChange} readOnly={getReadOnly("urgent")}>
                                    <option defaultValue={""}>Select</option>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                                </select>
                                {getErrorStyle(errors.urgent)}
                            </div>
                        </div>
                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="candidatescount" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Hiring Candidates Count <span className="text-red-500">*</span>
                            </label>
                            <div className="relative mt-1 sm:col-span-2 sm:mt-0">
                                <input type="number" name="candidatescount" id="candidatescount" min={1} className={getInputSytle(errors.candidatescount)} value={dataObj.candidatescount} onChange={handleChange} readOnly={getReadOnly("candidatescount")} />
                                {getErrorStyle(errors.candidatescount)}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6 pt-8 sm:space-y-5 sm:pt-10">
                    <div>
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Other Information</h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">This information will be displayed publicly so be careful what you share.</p>
                    </div>

                    <div className="mt-6 space-y-6 sm:mt-5 sm:space-y-5">
                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Category
                            </label>
                            <div className="mt-1 sm:col-span-2 sm:mt-0">
                                <select id="category" name="category" autoComplete="category" className={getInputSytle(errors.category)} value={dataObj.category} onChange={handleChange} readOnly={getReadOnly("category")}>
                                    <option selected disabled>
                                        Select Category
                                    </option>
                                    {getCollectionValues("jobcategory").map((v) => (
                                        <option key={v.key} value={v.value}>
                                            {v.value}
                                        </option>
                                    ))}
                                </select>
                                {getErrorStyle(errors.nationality)}
                            </div>
                        </div>
                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="jobtype" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Job Type <span className="text-red-500">*</span>
                            </label>
                            <div className="mt-1 sm:col-span-2 sm:mt-0">
                                <select id="jobtype" name="jobtype" autoComplete="jobtype" className={getInputSytle(errors.jobtype)} value={dataObj.jobtype} onChange={handleChange} readOnly={getReadOnly("jobtype")}>
                                    <option selected disabled>
                                        Select Job Type
                                    </option>
                                    {getCollectionValues("jobtype").map((v) => (
                                        <option key={v.key} value={v.value}>
                                            {v.value}
                                        </option>
                                    ))}
                                </select>
                                {getErrorStyle(errors.jobtype)}
                            </div>
                        </div>
                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="seniority" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Seniority <span className="text-red-500">*</span>
                            </label>
                            <div className="mt-1 sm:col-span-2 sm:mt-0">
                                <select id="seniority" name="seniority" autoComplete="seniority" className={getInputSytle(errors.seniority)} value={dataObj.seniority} onChange={handleChange} readOnly={getReadOnly("seniority")}>
                                    <option selected disabled>
                                        Select Seniority
                                    </option>
                                    {getCollectionValues("jobseniority").map((v) => (
                                        <option key={v.key} value={v.value}>
                                            {v.value}
                                        </option>
                                    ))}
                                </select>
                                {getErrorStyle(errors.seniority)}
                            </div>
                        </div>
                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="industry" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Industry
                            </label>
                            <div className="mt-1 sm:col-span-2 sm:mt-0">
                                <select id="industry" name="industry" autoComplete="industry" className={getInputSytle(errors.industry)} value={dataObj.industry} onChange={handleChange} readOnly={getReadOnly("industry")}>
                                    <option selected disabled>
                                        Select Industry
                                    </option>
                                    {getCollectionValues("jobindustry").map((v) => (
                                        <option key={v.key} value={v.value}>
                                            {v.value}
                                        </option>
                                    ))}
                                </select>
                                {getErrorStyle(errors.industry)}
                            </div>
                        </div>
                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="experience" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Experience Level
                            </label>
                            <div className="mt-1 sm:col-span-2 sm:mt-0">
                                <select id="experience" name="experience" autoComplete="experience" className={getInputSytle(errors.experience)} value={dataObj.experience} onChange={handleChange} readOnly={getReadOnly("experience")}>
                                    <option selected disabled>
                                        Select Experience Level
                                    </option>
                                    {getCollectionValues("jobexperiencelevel").map((v) => (
                                        <option key={v.key} value={v.value}>
                                            {v.value}
                                        </option>
                                    ))}
                                </select>
                                {getErrorStyle(errors.experience)}
                            </div>
                        </div>
                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="workplace" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Workplace Type
                            </label>
                            <div className="mt-1 sm:col-span-2 sm:mt-0">
                                <select id="workplace" name="workplace" autoComplete="workplace" className={getInputSytle(errors.workplace)} value={dataObj.workplace} onChange={handleChange} readOnly={getReadOnly("workplace")}>
                                    <option selected disabled>
                                        Select Workplace Type
                                    </option>
                                    {getCollectionValues("jobworkplace").map((v) => (
                                        <option key={v.key} value={v.value}>
                                            {v.value}
                                        </option>
                                    ))}
                                </select>
                                {getErrorStyle(errors.workplace)}
                            </div>
                        </div>
                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="education" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Min. Education Level
                            </label>
                            <div className="mt-1 sm:col-span-2 sm:mt-0">
                                <select id="education" name="education" autoComplete="education" className={getInputSytle(errors.education)} value={dataObj.education} onChange={handleChange} readOnly={getReadOnly("education")}>
                                    <option selected disabled>
                                        Select Education Level
                                    </option>
                                    {getCollectionValues("jobeducationlevel").map((v) => (
                                        <option key={v.key} value={v.value}>
                                            {v.value}
                                        </option>
                                    ))}
                                </select>
                                {getErrorStyle(errors.education)}
                            </div>
                        </div>
                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="education" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Avarage Salary <span className="text-red-500">*</span>
                            </label>
                            <div className="col-span-2 mt-1 sm:mt-0">
                                <div className="relative inline-flex w-full rounded-md shadow-sm">
                                    <div className=" inset-y-0 left-0 flex items-center">
                                        <label htmlFor="salary.currency" className="sr-only">
                                            Currency
                                        </label>
                                        <select id="salary.currency" name="salary.currency" autoComplete="salary.currency" className={getInputSytle(errors.salary?.currency) + " rounded-l-md rounded-r-none"} value={dataObj.salary?.currency} onChange={handleChange} readOnly={getReadOnly("salary.currency")}>
                                            <option selected disabled>
                                                Select Currency
                                            </option>
                                            {getCollectionValues("currencies").map((v) => (
                                                <option key={v.key} value={v.value}>
                                                    {v.value}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <input type="number" name="salary.avarage" id="salary.avarage" autoComplete="salary.avarage" className={getInputSytle(errors.salary?.avarage) + "rounded-none"} value={dataObj.salary?.avarage} min={0.0} placeholder="0.00" step="0.01" onChange={handleChange} readOnly={getReadOnly("salary.avarage")} />
                                    <div className=" inset-y-0 right-0 flex items-center">
                                        <label htmlFor="salary.timeperiod" className="sr-only">
                                            Time Period
                                        </label>
                                        <select name="salary.timeperiod" id="salary.timeperiod" autoComplete="salary.timeperiod" className={getInputSytle(errors.salary?.timeperiod) + " rounded-r-md rounded-l-none"} value={dataObj.salary?.timeperiod} onChange={handleChange} readOnly={getReadOnly("salary.timeperiod")}>
                                            <option>Per Hour</option>
                                            <option>Per Day</option>
                                            <option>Per Week</option>
                                            <option>Per Month</option>
                                            <option>Per Year</option>
                                        </select>
                                    </div>
                                </div>
                                {getErrorStyle(errors.salary)}
                            </div>
                        </div>
                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="social" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Media Links
                            </label>
                            <div className="mt-1 sm:col-span-2 sm:mt-0">
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

                <div className="space-y-6 pt-8 sm:space-y-5 sm:pt-10">
                    <div>
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Work Place Information</h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">This information will be displayed publicly so be careful what you share.</p>
                    </div>

                    <div className="mt-6 space-y-6 sm:mt-5 sm:space-y-5">
                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="place.country" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Country
                            </label>
                            <div className="mt-1 sm:col-span-2 sm:mt-0">
                                <select id="place.country" name="place.country" autoComplete="country-name" className={getInputSytle(errors.place?.country)} value={dataObj.place?.country} onChange={handleChange} readOnly={getReadOnly("place.country")}>
                                    <option selected disabled>
                                        Select Country
                                    </option>
                                    {getCollectionValues("countries").map((v) => (
                                        <option key={v.key} value={v.value}>
                                            {v.value}
                                        </option>
                                    ))}
                                </select>
                                {getErrorStyle(errors.place?.country)}
                            </div>
                        </div>

                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="place.street" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Street place
                            </label>
                            <div className="mt-1 sm:col-span-2 sm:mt-0">
                                <input type="text" name="place.street" id="place.street" autoComplete="street-address" className={getInputSytle(errors.place?.street)} value={dataObj.place?.street} onChange={handleChange} readOnly={getReadOnly("place.street")} />
                                {getErrorStyle(errors.place?.street)}
                            </div>
                        </div>

                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="place.city" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                City
                            </label>
                            <div className="mt-1 sm:col-span-2 sm:mt-0">
                                <input type="text" name="place.city" id="place.city" autoComplete="address-level2" className={getInputSytle(errors.place?.city)} value={dataObj.place?.city} onChange={handleChange} readOnly={getReadOnly("place.city")} />
                                {getErrorStyle(errors.place?.city)}
                            </div>
                        </div>

                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="place.state" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                State / Province
                            </label>
                            <div className="mt-1 sm:col-span-2 sm:mt-0">
                                <input type="text" name="place.state" id="place.state" autoComplete="address-level1" className={getInputSytle(errors.place?.state)} value={dataObj.place?.state} onChange={handleChange} readOnly={getReadOnly("place.state")} />
                                {getErrorStyle(errors.place?.state)}
                            </div>
                        </div>

                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="place.zip" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                ZIP / Postal code
                            </label>
                            <div className="mt-1 sm:col-span-2 sm:mt-0">
                                <input type="text" name="place.zip" id="place.zip" autoComplete="postal-code" className={getInputSytle(errors.place?.zip)} value={dataObj.place?.zip} onChange={handleChange} readOnly={getReadOnly("place.zip")} />
                                {getErrorStyle(errors.place?.zip)}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6 pt-8 sm:space-y-5 sm:pt-10">
                    <div>
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Registration Information</h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">This information will be displayed publicly so be careful what you share.</p>
                    </div>

                    <div className="mt-6 space-y-6 sm:mt-5 sm:space-y-5">
                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="registration.open" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Resistration Open
                            </label>
                            <div className="mt-1 sm:col-span-2 sm:mt-0">
                                <select id="registration.open" name="registration.open" className={getInputSytle(errors.registration?.open)} value={dataObj.registration?.open} onChange={handleChange} readOnly={getReadOnly("registration.open")}>
                                    <option defaultValue={true}>Select</option>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                                </select>
                                {getErrorStyle(errors.registration?.open)}
                            </div>
                        </div>
                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="registration.openforpublic" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Open For Public
                            </label>
                            <div className="mt-1 sm:col-span-2 sm:mt-0">
                                <select id="registration.openforpublic" name="registration.openforpublic" className={getInputSytle(errors.registration?.openforpublic)} value={dataObj.registration?.openforpublic} onChange={handleChange} readOnly={getReadOnly("registration.openforpublic")}>
                                    <option defaultValue={true}>Select</option>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                                </select>
                                {getErrorStyle(errors.registration?.openforpublic)}
                            </div>
                        </div>

                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="registration.hasstarttime" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Has Starting Time
                            </label>
                            <div className="mt-1 sm:col-span-2 sm:mt-0">
                                <select id="registration.hasstarttime" name="registration.hasstarttime" className={getInputSytle(errors.registration?.hasstarttime)} value={dataObj.registration?.hasstarttime} onChange={handleChange} readOnly={getReadOnly("registration.hasstarttime")}>
                                    <option defaultValue={""}>Select</option>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                                </select>
                                {getErrorStyle(errors.registration?.hasstarttime)}
                            </div>
                        </div>

                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="registration.time.starttime" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Starting Time
                            </label>
                            <div className="mt-1 sm:col-span-2 sm:mt-0">
                                <input id="registration.time.starttime" name="registration.time.starttime" type="datetime-local" placeholder="Select a date and time" disabled={dataObj.registration?.hasstarttime == "false"} className={getInputSytle(errors.registration?.time?.starttime)} value={dataObj.registration?.time?.starttime} onChange={handleChange} readOnly={getReadOnly("registration.time.starttime")} />
                                {getErrorStyle(errors.registration?.time?.starttime)}
                            </div>
                        </div>

                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="registration.hasendtime" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Has Closing Time
                            </label>
                            <div className="mt-1 sm:col-span-2 sm:mt-0">
                                <select id="registration.hasendtime" name="registration.hasendtime" className={getInputSytle(errors.registration?.hasendtime)} value={dataObj.registration?.hasendtime} onChange={handleChange} readOnly={getReadOnly("registration.hasendtime")}>
                                    <option defaultValue={""}>Select</option>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                                </select>
                                {getErrorStyle(errors.registration?.hasendtime)}
                            </div>
                        </div>

                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="registration.time.endtime" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Closing Time
                            </label>
                            <div className="mt-1 sm:col-span-2 sm:mt-0">
                                <input id="registration.time.endtime" name="registration.time.endtime" type="datetime-local" placeholder="Select a date and time" disabled={dataObj.registration?.hasendtime == "false"} className={getInputSytle(errors.registration?.time?.endtime)} value={dataObj.registration?.time?.endtime} onChange={handleChange} readOnly={getReadOnly("registration.time.endtime")} />
                                {getErrorStyle(errors.registration?.time?.endtime)}
                            </div>
                        </div>
                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="registration.usesystemform" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Use System Form to Register
                            </label>
                            <div className="mt-1 sm:col-span-2 sm:mt-0">
                                <select id="registration.usesystemform" name="registration.usesystemform" className={getInputSytle(errors.registration?.usesystemform)} value={dataObj.registration?.usesystemform} onChange={handleChange} readOnly={getReadOnly("registration.usesystemform")}>
                                    <option defaultValue={""}>Select</option>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                                </select>
                                {getErrorStyle(errors.registration?.usesystemform)}
                            </div>
                        </div>
                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="registration.formurl" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Registration Form URL
                            </label>
                            <div className="mt-1 sm:col-span-2 sm:mt-0">
                                <input type="text" name="registration.formurl" id="registration.formurl" disabled={dataObj.registration?.usesystemform == "true"} className={getInputSytle(errors.registration?.formurl)} value={dataObj.registration?.formurl} onChange={handleChange} readOnly={getReadOnly("registration.formurl")} />
                                {getErrorStyle(errors.registration?.formurl)}
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
            <NotificationContainer />
        </form>
    );
};
export default Add;
