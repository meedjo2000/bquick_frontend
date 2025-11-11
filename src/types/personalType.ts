export type TPersonal = {
    id: number;
    photo: string;
    last_name: string;
    first_name: string;
    phone_number: string;
    email: string;
    position_title: string;
    gender: "Homme" | "Femme";
    birth_date?: string;
    position_id: number;
    hire_date: string;
    user_id: number;
}

export type TPersonalFormData = {
    id: number,
    photo?: string;
    last_name: string;
    first_name: string;
    birth_date?: string;
    phone_number: string;
    email: string;
    position_id: string;
    gender: string;
    type: string;
}

export type TPersonalFormatted = {
    id: number;
    photo: string;
    photo_original: string;
    last_name: string;
    first_name: string;
    phone_number: string;
    email: string;
    position_id: number;
    position_title: string;
    gender: "Homme" | "Femme";
    birth_date: string;
    hire_date: string;
    user_id: number;
}

export type TData = Record<"id" | "last_name" | "first_name" | "photo", string>;

