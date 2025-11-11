import {Action, combineReducers, configureStore, ThunkAction,} from '@reduxjs/toolkit';
import userReducer from "./features/user/user-slice";
//import storage from "redux-persist/lib/storage";
import {persistReducer} from "redux-persist";
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from "redux-persist/es/constants";
import {TypedUseSelectorHook, useSelector} from "react-redux";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const createNoopStorage = () => {

    return {
        getItem(_key) {
            return Promise.resolve(null);
        },
        setItem(_key, value) {
            return Promise.resolve(value);
        },
        removeItem(_key) {
            return Promise.resolve();
        },
    };
};

const storage = typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage();

//export default storage;

const persistConfig = {
    key: "root",
    version: 1,
    storage,
};

const reducer = combineReducers({
    user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

