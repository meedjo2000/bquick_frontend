"use client";

import Link from "next/link";
import Image from "next/image";
import LogoIcon from '/public/images/logos/logo-icon-bquick.svg';

const Logo = () => {
    return (
        <Link href="/">
            <Image src={LogoIcon} alt="logo" />
        </Link>
    );
};

export default Logo;