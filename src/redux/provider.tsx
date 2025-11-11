"use client";

import React from "react";
import { store } from "@/redux/store";
import {PersistGate} from "redux-persist/integration/react";
import { Provider } from "react-redux";
import {persistStore} from "redux-persist";

const persistor = persistStore(store);

export function ReduxProvider({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>{children}</PersistGate>
        </Provider>
    )
}