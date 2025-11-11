import React from 'react';
import Link from "next/link";
import {Icon} from "@iconify/react";

const BreadcrumbComponent = ({title, icon, iconLink, crumbTitle=title}: any) => {
    return (
        <div className="flex rounded-xl bg-white dark:bg-darkgray p-6 relative w-full break-words flex-col card mb-[30px] dark:shadow-dark-md shadow-md">
            <div className="flex h-full flex-col justify-center gap-2 p-0">
                <nav aria-label="Breadcrumb" className="flex justify-between">
                    <li className="flex items-center w-full">
                        <h6 className="text-base">{title}</h6>
                        <div className="flex items-center gap-3 ms-auto">
                            <>
                                <Link href={iconLink} className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white">
                                    <Icon icon={icon} height={18}/>
                                </Link>
                                <span>/</span>
                            </>
                            <span className="flex h-fit w-fit items-center font-medium bg-lightprimary dark:bg-lightprimary text-primary p-1 text-xs rounded-full px-2.5 py-1">
                                <span>{crumbTitle}</span>
                            </span>
                        </div>
                    </li>
                </nav>
            </div>
        </div>
    );
};

export default BreadcrumbComponent;