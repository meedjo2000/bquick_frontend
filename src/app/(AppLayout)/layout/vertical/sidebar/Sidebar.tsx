"use client";

import { Sidebar} from "flowbite-react";
import FullLogo from "@/app/(AppLayout)/layout/shared/FullLogo";
import Logo from "../../shared/Logo";
import SimpleBar from 'simplebar-react';
import SidebarContent from "./Sidebaritems";
import React from "react";
import {NavCollapse} from "../sidebar/NavCollapse";
import { NavItems } from "./NavItems";
import {cn} from "@/lib/utils";

const SidebarLayout = ({isSidebarExpanded}: any) => {
    const [collapseStatus, setCollapseStatus] = React.useState(true);
    const handleSidebarEnter = () => {
        //setCollapseStatus(true);
    }
    const handleSidebarLeave = () => {
        /*if (isSidebarExpanded) {
            setCollapseStatus(true);
        }
        else {
            setCollapseStatus(false);
        }*/
    }

    return (
        <>
            <div className="xl:block hidden">
                <div className="flex">
                    <Sidebar
                        className={cn(isSidebarExpanded ? 'w-[260px]' : 'w-[80px]', 'sidebar  hover:w-[260px] hover:bg-white menu-sidebar pt-6 bg-white dark:bg-darkgray z-[50]')}
                        onMouseOver={handleSidebarEnter}
                        ///onMouseLeave={handleSidebarLeave}
                        onMouseOut={handleSidebarLeave}
                    >
                        <div className="mb-7 px-4 brand-logo">
                            {isSidebarExpanded ? <FullLogo /> : <Logo />}
                        </div>
                        <SimpleBar className="h-[calc(100vh_-_120px)]">
                            <Sidebar.Items className="px-4">
                                <Sidebar.ItemGroup className="sidebar-nav">
                                    {SidebarContent.map((item, index) => (<React.Fragment key={index}>
                                        {/*<h5 className="text-link font-semibold text-sm caption">
                                            <span className="hide-menu">{item.heading}</span>
                                        </h5>
                                        <Icon icon="solar:menu-dots-bold" height={18} className="text-ld block mx-auto mt-6 leading-6 dark:text-opacity-60 hide-icon" />
                                        */}
                                        {
                                            item.children?.map((child, childIndex) => (<React.Fragment key={childIndex}>
                                                {child.children ? (
                                                    <div className="collpase-items">
                                                        <NavCollapse item={child} collapseStatus={collapseStatus} />
                                                    </div>
                                                    ) : (
                                                    <NavItems item={child} />
                                                )}
                                            </React.Fragment>))
                                        }
                                    </React.Fragment>))}
                                </Sidebar.ItemGroup>
                            </Sidebar.Items>
                            {/*<Upgrade />*/}
                        </SimpleBar>
                    </Sidebar>
                </div>
            </div>
        </>
    );
};

export default SidebarLayout;