"use client";

import Link from "next/link";
import Image from "next/image";
import LogoAkwaba from '/public/images/logos/logo_akuaba.svg'

const LogoAkuaba = () => {
    return (
        <Link href="#">
            <Image src={LogoAkwaba} alt="logo" width={160} />
        </Link>
    );
};

export default LogoAkuaba;