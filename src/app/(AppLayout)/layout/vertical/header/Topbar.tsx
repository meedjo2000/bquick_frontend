import React from "react";
import Image from "next/image";
import wrappixel_logo from "/public/images/logos/logo-wrappixel.svg";
import Link from "next/link";
import {Icon} from "@iconify/react";

const Topbar = () => {
    return (
        <div className="py-3 px-4 bg-dark z-40 sticky top-0 ">
            <div className="flex items-center xl:justify-between lg:justify-center xl:gap-0 lg:gap-0 flex-wrap justify-center">
                <div className="flex items-center gap-12">
                    <Image
                        src={wrappixel_logo}
                        alt="Logo"
                        width={140}
                        height={140}
                    />
                    <div className="lg:flex items-center gap-3 hidden">
                        <Link
                            href="https://support.meedjo.com"
                            className="flex items-center gap-1 text-white bg-transparent hover:bg-primary py-2 px-3 rounded-full"
                        >
                            <Icon icon="tabler:lifebuoy" className="shrink-0 text-[19px]"></Icon>
                            <h4 className="text-sm font-medium leading-none text-white">Support</h4>
                        </Link>
                        <Link
                            href="https://meedjo.com"
                            className="flex items-center gap-1 text-white bg-transparent hover:bg-primary py-2 px-3 rounded-full"
                        >
                            <Icon icon="tabler:gift" className="shrink-0 text-[19px]"></Icon>
                            <h4 className="text-sm font-medium leading-none text-white">Templates</h4>
                        </Link>
                        <Link
                            href="https://meedjo.com/hire-us"
                            className="flex items-center gap-1 text-white bg-transparent hover:bg-primary py-2 px-3 rounded-full"
                        >
                            <Icon icon="tabler:briefcase" className="shrink-0 text-[19px]"></Icon>
                            <h4 className="text-sm font-medium leading-none text-white">Hire us</h4>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Topbar;