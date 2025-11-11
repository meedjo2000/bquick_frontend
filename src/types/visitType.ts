import {TData} from "@/types/personalType";

export type TVisit = {
    id: number;
    last_name: string;
    first_name: string;
    visit_reason: string;
    identity_number: string;
    phone_number: string;
    start_date: string;
    end_date: string;
    department_id: number;
    visit_type_id: number;
    visit_type_title: string;
    department_name: string,
    user_id: number;
    editor: string;
    employees: TData[],
    employee_ids: number[];
    status: boolean;
}

export type TVisitFormatted = {
    id: number;
    last_name: string;
    first_name: string;
    visit_reason: string;
    phone_number: string;
    identity_number: string;
    identity_photo: string;
    identity_photo_original: string;
    start_date: string;
    end_date: string;
    status: boolean;
    visit_type_id: number;
    visit_type_title: string;
    department_id: number;
    department_name: string,
    user_id: number;
    editor: string;
    employees: [],
    employee_ids: number[];
}


export type TVisitType = {
    id: number;
    title: string;
}
