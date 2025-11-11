import {getRequest, postRequest} from "@/api/api-manager";

class VisitService {
    static getAVisit = async (url: string) => {
        return await getRequest(url);
    }
    static getVisits = async (url: string) => {
        return await getRequest(url);
    }
    static getVisitsTypes = async (url: string) => {
        return await getRequest(url);
    }
    static createVisit= async (url: string, data: FormData) => {
        return await postRequest(url, data);
    }
    static updateVisit = async (url: string, data: FormData) => {
        return await postRequest(url, data);
    }
    static getAllVisitTypes = async (url: string) => {
        return await getRequest(url);
    }
    static createVisitType = async (url: string, data: FormData) => {
        return await postRequest(url, data);
    }
    static updateVisitType = async (url: string, data: FormData) => {
        return await postRequest(url, data);
    }
    static deleteVisitTypes = async (url: string, data: FormData) => {
        return await postRequest(url, data);
    }
    static reformatVisitTypes = (visitTypes: any[]) => {
        return visitTypes.map(visitType => ({
            id: visitType.id,
            visit_type_title: visitType.title,
            status: visitType.status,
        }));
    }
}

export default VisitService;