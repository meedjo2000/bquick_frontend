import React from 'react';
import {ChildItem} from "../Sidebaritems";
import {usePathname} from "next/navigation";
import {Icon} from "@iconify/react";
import {HiOutlineChevronDown} from "react-icons/hi";
import {twMerge} from "tailwind-merge";
import { Sidebar } from 'flowbite-react';
import {NavItems} from "../NavItems";

interface NavCollapseProps {
    item: ChildItem;
    collapseStatus?: boolean;
}
export const NavCollapse:React.FC<NavCollapseProps> = ({item, collapseStatus=true}: any) => {
    const pathname = usePathname();
    const activeDD = item.children.find((t:{url: string} ) => t.url === pathname);
    return (
        <Sidebar.Collapse
            label={item.name}
            //open={activeDD ? true : false}
            open={!!activeDD}
            icon={() => <Icon icon={item.icon} height={24} className="mr-3" />}
            renderChevronIcon={(theme, open) => {
                const IconComponent = open
                    ? HiOutlineChevronDown
                    : HiOutlineChevronDown;
                return (
                    <div className="flex items-center" >
                        <IconComponent
                            aria-hidden
                            className={`${twMerge(theme.label.icon.open[open ? "on" : "off"])} drop-icon order-3 text-base`}
                        />
                        {item.isPro ? (
                            <span className="py-1 px-2.5 text-[10px] bg-lightsecondary text-secondary rounded-full order-0">Pro</span>
                        ) : null}
                    </div>

                );
            }}
        >
            {/* Render child items */}
            {item.children && (
                <Sidebar.ItemGroup className="sidebar-dropdown">
                    {item.children.map((child: any) => (
                        <React.Fragment key={child.id}>
                            {/* Render NavItems for child items */}
                            {child.children ? (
                                <NavCollapse item={child}  /> // Recursive call for nested collapse
                            ) : collapseStatus && (<NavItems item={child} /> )}
                        </React.Fragment>
                    ))}
                </Sidebar.ItemGroup>
            )}
        </Sidebar.Collapse>
    );
};