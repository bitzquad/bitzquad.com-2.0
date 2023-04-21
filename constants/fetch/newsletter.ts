/*    Imports    */
import axios from "axios";

// subscribe through api
const subscribe = async (email: string, loadingCallback: (loading: boolean) => void): Promise<any | null> => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/newsletter/subscribe`;
    loadingCallback(true); // set loading callback of parent function to 'true'
    let response = null;
    try {
        response = await axios.post(url, { email });
    } catch (e) {
        console.log(e);
    }
    loadingCallback(false); // set loading callback of parent function to 'false'
    if (response?.status == 200) return response?.data;
    return null;
};

// subscribe through api
const unsubscribe = async (email: string, loadingCallback: (loading: boolean) => void): Promise<any | null> => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/newsletter/unsubscribe`;
    loadingCallback(true); // set loading callback of parent function to 'true'
    let response = null;
    try {
        response = await axios.post(url, { email });
    } catch (e) {
        console.log(e);
    }
    loadingCallback(false); // set loading callback of parent function to 'false'
    if (response?.status == 200) return response?.data;
    return null;
};

export default {
    subscribe,
    unsubscribe,
};
