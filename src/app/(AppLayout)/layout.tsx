"use client";

import React, {ReactNode, useEffect, useState} from "react";
import Sidebar from "@/app/(AppLayout)/layout/vertical/sidebar/Sidebar";
import Header from "@/app/(AppLayout)/layout/vertical/header/Header";
import Link from "next/link";
import 'simplebar-react/dist/simplebar.min.css';
import {cn} from "@/lib/utils";
import AuthenticationService from "@/services/AuthenticationService";
import {useDispatch} from "react-redux";
import {AppDispatch, useAppSelector} from "@/redux/store";
import {useRouter} from "next/navigation";
import {Toaster} from "@/components/ui/sonner";
import {onIsStayConnected} from "@/redux/features/user/user-slice";

const Layout = ({ children }: Readonly<{children: ReactNode}>) => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    //const [authStatus, setAuthStatus] = useState(AuthenticationService.checkUserToken());
    const userData = useAppSelector((state) => state.user);

    const [isSidebarExpanded, setIsSidebarExpanded] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = window.localStorage.getItem('sidebarExpanded');
            if (saved === null) {
                return true;
            }
            return JSON.parse(saved);
        }
        return true; // default state if window is not defined
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.localStorage.setItem(
                'sidebarExpanded',
                JSON.stringify(isSidebarExpanded),
            );
        }

        if(!AuthenticationService.checkUserToken()) {
            ////setAuthStatus(AuthenticationService.checkUserToken());
            dispatch(onIsStayConnected(AuthenticationService.checkUserToken()));
            AuthenticationService.onLogout(dispatch, router);
        }

    }, [dispatch, isSidebarExpanded, router]);

    return (
       <>
           {userData.isStayConnected ? (
               <div className="flex w-full bg-lightgray min-h-[calc(100vh_-_65px)]">
                   <div className={cn(isSidebarExpanded ? 'page-wrapper flex w-full' : 'mini-page-wrapper flex w-full')}>
                       <Sidebar isSidebarExpanded={isSidebarExpanded} />
                       <div className="page-wrapper-sub flex flex-col w-full">
                           <Header isSidebarExpanded={isSidebarExpanded} setIsSidebarExpanded={setIsSidebarExpanded} />
                           <div className="h-100">
                               <div className="w-full">
                                   {/*container with boxed width options*/}
                                   {/*<div className="container py-30">{children}</div>*/}
                                   {/*container with full width options*/}
                                   <div className="w-full py-[30px] md:px-[30px] px-5">{children}</div>
                                   <Toaster
                                       position="top-right"
                                       theme="light"
                                       richColors
                                       closeButton
                                   />
                               </div>
                           </div>
                           <div className="bg-lightgray text-center mt-auto">
                               <p className="text-thin p-5">
                                   Copyright © 2025 <Link href="https://meedjo.com" target="_blank" className="pl-1 decoration-primary">meedjo.com</Link>. Tous droits reservés.
                               </p>
                           </div>
                       </div>
                   </div>
               </div>
           ):(
               <div>Loading</div>
           )}

       </>
    );
};

export default Layout;