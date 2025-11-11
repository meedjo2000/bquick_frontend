"use client";
import React from "react";
import { ChildItem } from "../Sidebaritems";
import { Sidebar } from "flowbite-react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItemsProps {
    item: ChildItem;
}

export const NavItems: React.FC<NavItemsProps> = ({ item }) => {
    const pathname = usePathname();
    let pathnameStatus;
    if(item.url !== '/') {
        pathnameStatus = pathname.length >= 2 && pathname.includes(item.url);
    }

    return (
        <>
            <Sidebar.Item
                className={`${
                    (item.url === pathname || pathnameStatus) 
                        ? "!text-primary bg-lightprimary" 
                        : "text-link bg-transparent group/link"
                }`}
                href={item.url}
                as={Link}
                target={item.isPro ? "_blank" : "_self"}
            >
                <div className="flex justify-between items-center">
                    <span className="flex gap-3 justify-center items-center truncate">
                        {item.icon ? (
                            <Icon icon={item.icon} className={`${item.color}`} height={24} />
                        ) : (
                            <span
                                className={`${(item.url == pathname || pathnameStatus)
                                    ? "dark:bg-white rounded-full mx-1.5 group-hover/link:bg-primary !bg-primary h-[6px] w-[6px]"
                                    : "h-[6px] w-[6px] bg-darklink dark:bg-white rounded-full mx-1.5 group-hover/link:bg-primary"
                                } `}
                            ></span>
                        )}
                        <span className="max-w-[110px] overflow-hidden truncate hide-menu flex-1 ml-3">{item.name}</span>
                    </span>
                    {item.isPro? <span className="py-1 px-2.5 text-[10px] bg-lightsecondary text-secondary rounded-full">Pro</span> :null}
                </div>
            </Sidebar.Item>
        </>
    );
};