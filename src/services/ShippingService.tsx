import {getRequest, postRequest} from "@/api/api-manager";

class ShippingService {
    static getShipping = async (url: string) => {
        return await getRequest(url);
    }
    static deleteShipping = async (url: string, data: FormData) => {
        return await postRequest(url, data);
    }
    static createShipping = async (url: string, data: FormData) => {
        return await postRequest(url, data);
    }
    static updateShipping = async (url: string, data: FormData) => {
        return await postRequest(url, data);
    }
}

export default ShippingService;