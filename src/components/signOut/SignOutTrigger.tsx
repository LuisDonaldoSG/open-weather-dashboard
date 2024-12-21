'use client';

import { HOME_PATH } from "@utils/paths";
import { signOut } from "next-auth/react";
import { useEffect } from "react";
import Loading from '@root/src/app/(protected)/loading';

export default function SignOutTrigger() {

    useEffect(() => {
        setTimeout(() => {
            signOut({
                redirect: true,
                redirectTo: HOME_PATH
            });
        }, 1000);
    },[]);

    return (
        <div>
            <Loading />
        </div>
    );
}