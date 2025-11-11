import {getRequest, postRequest} from "@/api/api-manager";
import {TDepartment} from "@/types/departmentType";

class DepartmentService {
    static getDepartments = async (url: string) => {
        return await getRequest(url);
    }
    static createDepartment = async (url: string, data: FormData) => {
        return await postRequest(url, data);
    }
    static updateDepartment = async (url: string, data: FormData) => {
        return await postRequest(url, data);
    }
    static deleteDepartments = async (url: string, data: FormData) => {
        return await postRequest(url, data);
    }
    static reformatDepartments = (department: TDepartment[]) => {
        return department.map(department => ({
            id: department.id,
            department_title: department.title,
            status: department.status,
        }));
    }
}

export default DepartmentService;