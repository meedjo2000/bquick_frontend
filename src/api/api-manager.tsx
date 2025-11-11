import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_URL+'/api';
axios.defaults.headers.post["Accept"] = "application/json";
axios.defaults.headers.post["Content-Type"] = "application/json";

export const getAuthToken = () => {
    return window.localStorage.getItem("authToken")
}
export const setAuthToken = (token: string) => {
    window.localStorage.setItem("authToken", token);
}

export const removeAuthToken = () => {
    window.localStorage.removeItem("authToken");
}


export const getRequest = async (url: string) => {
    let headers = {};
    if (getAuthToken() !== null && getAuthToken() !== undefined) {
        headers = { ...headers,  ...{"Authorization": `Bearer ${getAuthToken()}`} }
    }
    const config = {
        headers:headers
    }
    const response = await axios.get(url, config);
    return response.data;
}

export const postRequest = async (url: string, data: object) => {
    let headers = {"Content-Type": "multipart/form-data"};
    if (getAuthToken() !== null && getAuthToken() !== undefined) {
        headers = { ...headers,  ...{"Authorization": `Bearer ${getAuthToken()}`} }
    }

    const config = {
        headers:headers
    }
    return await axios.post(url, data, config);
}

