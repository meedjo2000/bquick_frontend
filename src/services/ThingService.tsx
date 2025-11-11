import {getRequest, postRequest} from "@/api/api-manager";

class ThingService {
    static getAllThingsTypes = async (url: string) => {
        return await getRequest(url);
    }
    static createThingType = async (url: string, data: FormData) => {
        return await postRequest(url, data);
    }
    static deleteThingsTypes = async (url: string, data: FormData) => {
        return await postRequest(url, data);
    }
    static getAllForgetThings = async (url: string) => {
        return await getRequest(url);
    }
    static createThing= async (url: string, data: FormData) => {
        return await postRequest(url, data);
    }
    static updateThing = async (url: string, data: FormData)  => {
        return await postRequest(url, data);
    }
    static deleteThings = async (url: string, data: FormData) => {
        return await postRequest(url, data);
    }
}

export default ThingService;