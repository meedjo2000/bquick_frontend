"use client";

import Link from "next/link";
import Image from "next/image";
import LogoBq from '/public/images/logos/logo-bquick.svg';

const LogoBquick = () => {
    return (
        <Link href="#">
            <Image src={LogoBq} alt="logo" width={160} />
        </Link>
    );
};

export default LogoBquick;