'use server';

import { signIn } from "@root/auth";
import { AuthError } from "next-auth";
import { auth } from "@root/auth";
import dayjs from "dayjs";

export async function loginAction(_prevState: undefined, formData: FormData) {
    try {
        const logged = await signIn('credentials', {
            username: formData.get('username'),
            password: formData.get('password'),
            redirect: false
        });
        return logged;
    } catch (error) {
        if (error instanceof AuthError) {
            return { error: error.cause?.err?.message };
        }
        return { error: 'error en el servidor' };
    }
}

export async function isExpiredSession(): Promise<boolean> {
    try {
        const session = await auth();
        const expiredSessionIn = dayjs(session?.expires).unix();
        const now = dayjs().unix();
        if ((now >= expiredSessionIn) || session === null) {
            return true;
        }
        return false;
    } catch (error) {
        throw new Error(`error: ${error}`);
    }
}