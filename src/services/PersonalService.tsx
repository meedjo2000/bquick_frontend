import {getRequest, postRequest} from "@/api/api-manager";
import {TPersonalFormatted} from "@/types/personalType";
import {TPosition} from "@/types/positionType";

class PersonalService {
    static getEmployees= async (url: string) => {
        return await getRequest(url);
    }
    static getAnEmployee = async (url: string) => {
        return await getRequest(url);
    }
    static getPositions= async (url: string) => {
        return await getRequest(url);
    }
    static createPosition = async (url: string, data: FormData) => {
        return await postRequest(url, data);
    }
    static updatePosition = async (url: string, data: FormData) => {
        return await postRequest(url, data);
    }
    static deletePositions = async (url: string, data: FormData) => {
        return await postRequest(url, data);
    }
    static reformatPositions = (positions: TPosition[]) => {
        return positions.map(position => ({
            id: position.id,
            position_title: position.title
        }));
    }
    static createEmployee= async (url: string, data: FormData) => {
        return await postRequest(url, data);
    }
    static updateEmployee = async (url: string, data: FormData) => {
        return await postRequest(url, data);
    }
    static formatEmployeeForList = (employee: any) => {
        const employeeFormatted: TPersonalFormatted = {
            id: employee.id,
            last_name: employee.last_name,
            first_name: employee.first_name,
            email: employee.email,
            phone_number: employee.phone_number,
            position_id: employee.position_id,
            position_title: employee.position_title,
            gender: employee.gender,
            photo: employee.photo ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/`+employee.photo : '',
            photo_original: employee.photo ? employee.photo : '',
            birth_date: employee.birth_date ? employee.birth_date : '',
            hire_date: employee.hire_date ? employee.hire_date : '',
            user_id: employee.user,
        }
        return employeeFormatted;
    }
    static deleteEmployees = async (url: string, data: FormData) => {
        return await postRequest(url, data);
    }
}

export default PersonalService;