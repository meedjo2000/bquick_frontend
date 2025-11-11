import {getAuthToken, getRequest, postRequest, removeAuthToken} from "@/api/api-manager";
import {FormikValues} from 'formik';
import {jwtDecode} from "jwt-decode";
import {logoutUser} from "@/redux/features/user/user-slice";
import { TUser } from "@/types/userType";
import { ThunkDispatch, UnknownAction, Dispatch } from "@reduxjs/toolkit";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { PersistPartial } from "redux-persist/es/persistReducer";
type DecodedToken = {
    exp: number;
};

class AuthenticationService {
    static authenticateUser = async (url: string, data: FormikValues) => {
        return await postRequest(url, data);
    };
    static getUser = async (url: string) => {
        return await getRequest(url);
    };
    static checkUserToken = (): boolean => {
        const token = getAuthToken();
        if (token) {
            const decodedToken = jwtDecode<DecodedToken>(token);
            const currentDate = new Date();
            // JWT exp is in seconds
            //if (decodedToken.exp * 1000 < currentDate.getTime())
            if ((decodedToken?.exp || 0) * 1000 < currentDate.getTime()) {
                return false;
            }
            return true;
        }
        return false;
    }
    static onLogout = (dispatch: ThunkDispatch<{
        user: TUser;
    } & PersistPartial, undefined, UnknownAction> & Dispatch<UnknownAction>, router: string[] | AppRouterInstance) => {
        removeAuthToken();
        dispatch(logoutUser());
        router.push('/auth/login');
    }
}

export default AuthenticationService;