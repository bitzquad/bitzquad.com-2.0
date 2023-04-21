/*    Imports    */
import axios from "axios";
import CCollection from "../../types/classes/collection/CCollection";
import queryparser from "../queryparser";

// get infomation by id through api
const getById = async (id: string, select: any = {}, loadingCallback: (loading: boolean) => void, options: any = {}): Promise<CCollection | null> => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/collections?${queryparser.Build({ _id: id }, select)}`;
    loadingCallback(true); // set loading callback of parent function to 'true'
    let response = null;
    try {
        response = await axios.get(url, options);
    } catch (e) {
        console.log(e);
    }
    loadingCallback(false); // set loading callback of parent function to 'false'
    if (response?.data && response?.data.values.length > 0 && response?.status == 200) return response?.data.values[0] as CCollection;
    return null;
};
// get 'collection' values by key through api
const getCollectionValues = async (key: string, loadingCallback: (loading: boolean) => void, options: any = {}): Promise<any[]> => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/collections?${queryparser.Build({ key: key }, { values: 1 })}`;
    loadingCallback(true); // set loading callback of parent function to 'true'
    let response = null;
    try {
        response = await axios.get(url, options);
    } catch (e) {
        console.log(e);
    }
    loadingCallback(false); // set loading callback of parent function to 'false'
    if (response?.data && response?.data.values.length > 0 && response?.status == 200) return response?.data.values[0].values;
    return [];
};
// get specific infomation through api
const getCollections = async (ids: string[], loadingCallback: (loading: boolean) => void, options: any = {}): Promise<CCollection[] | null> => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/collections?${queryparser.Build({ key: { $in: ids } }, { values: 1, key: 1 })}`;
    loadingCallback(true); // set loading callback of parent function to 'true'
    let response = null;
    try {
        response = await axios.get(url, options);
    } catch (e) {
        console.log(e);
    }
    loadingCallback(false); // set loading callback of parent function to 'false'
    if (response?.data && response?.data.values.length > 0 && response?.status == 200) return response?.data.values;
    return [];
};
// get all infomation through api
const getAll = async (
    select: any = {},
    count: boolean = false,
    countonly: boolean = false,
    loadingCallback: (loading: boolean) => void,
    options: any = {}
): Promise<{ values: CCollection[]; count: number; itemsperpage: number; page: number } | null> => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/collections?${queryparser.Build({}, select, 10000000, 0)}&count=${count}&countonly=${countonly}`;
    loadingCallback(true); // set loading callback of parent function to 'true'
    let response = null;
    try {
        response = await axios.get(url, options);
    } catch (e) {
        console.log(e);
    }
    loadingCallback(false); // set loading callback of parent function to 'false'
    if (response?.status == 200) return response?.data;
    return null;
};
// get infomation according to query through api
const get = async (
    search: any = {},
    select: any = {},
    count: boolean = false,
    countonly: boolean = false,
    items: number = 10,
    page: number = 0,
    sort: any = { createdAt: -1 },
    loadingCallback: (loading: boolean) => void,
    options: any = {}
): Promise<{ values: CCollection[]; count: number; itemsperpage: number; page: number } | null> => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/collections?${queryparser.Build(search, select, items, page, sort)}&count=${count}&countonly=${countonly}`;
    loadingCallback(true); // set loading callback of parent function to 'true'
    let response = null;
    try {
        response = await axios.get(url, options);
    } catch (e) {
        console.log(e);
    }
    loadingCallback(false); // set loading callback of parent function to 'false'
    if (response?.status == 200) return response?.data;
    return null;
};
// create new infomation through api
const create = async (collection: CCollection, draft: boolean = false, loadingCallback: (loading: boolean) => void, options: any = {}): Promise<CCollection | null> => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/collections?draft=${draft}`;
    loadingCallback(true); // set loading callback of parent function to 'true'
    let response = null;
    try {
        response = await axios.post(url, collection);
    } catch (e) {
        console.log(e);
    }
    loadingCallback(false); // set loading callback of parent function to 'false'
    if (response?.status == 200) return response?.data;
    return null;
};
// update infomation through api
const update = async (collection: CCollection, draft: boolean = false, loadingCallback: (loading: boolean) => void, options: any = {}): Promise<CCollection | null> => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/collections?draft=${draft}`;
    loadingCallback(true); // set loading callback of parent function to 'true'
    let response = null;
    try {
        response = await axios.put(url, collection);
    } catch (e) {
        console.log(e);
    }
    loadingCallback(false); // set loading callback of parent function to 'false'
    if (response?.status == 200) return response?.data;
    return null;
};
// delete infomation trough api
const remove = async (id: string, permanent: boolean = false, loadingCallback: (loading: boolean) => void, options: any = {}): Promise<any> => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/collections`;
    const body: any = { ids: [id], permanent: permanent }; // remove request payload
    loadingCallback(true); // set loading callback of parent function to 'true'
    let response = null;
    try {
        response = await axios.delete(url, { ...options, data: body });
    } catch (e) {
        console.log(e);
    }
    loadingCallback(false); // set loading callback of parent function to 'false'
    if (response?.status == 200) return true;
    return false;
};
// delete given infomation trough ids from api
const removeBulk = async (ids: string[], permanent: boolean = false, loadingCallback: (loading: boolean) => void, options: any = {}): Promise<any> => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/collections`;
    const body: any = { ids: ids, permanent: permanent }; // remove request payload
    loadingCallback(true); // set loading callback of parent function to 'true'
    let response = null;
    try {
        response = await axios.delete(url, { ...options, data: body });
    } catch (e) {
        console.log(e);
    }
    loadingCallback(false); // set loading callback of parent function to 'false'
    if (response?.status == 200) return true;
    return false;
};

export default {
    getById,
    getCollections,
    getCollectionValues,
    getAll,
    get,
    create,
    update,
    remove,
    removeBulk,
};
