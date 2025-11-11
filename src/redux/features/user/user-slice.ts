import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {TUser} from "@/types/userType";

const initialState = {
    user: {},
    isLoggedIn: false,
    isStayConnected: false,
    lang: 'fr-fr'
} as TUser;

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginUser: (state, action: PayloadAction<TUser>) => {
           /* state.userData = action.payload;
            state.isLoggedIn = true;*/
            //state.onBoardingStatus = false;
            //state.userToken = action.payload.token;
            //console.log("user login", JSON.stringify(action.payload));
            return {
                ...state,
                isLoggedIn: true,
                isStayConnected: action.payload.isStayConnected,
                user: action.payload.user,
            }
        },
        logoutUser: () => {
            return initialState;
        },
        onIsStayConnected: (state, action: PayloadAction<boolean>) => {
            state.isStayConnected = action.payload;
        }
    }
});

export const { loginUser, logoutUser, onIsStayConnected} = userSlice.actions;

export default userSlice.reducer;
