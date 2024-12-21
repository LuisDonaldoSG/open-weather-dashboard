'use client';

import { loginAction } from '@services/auth';
import { useFormState } from "react-dom";
import ButtonSubmit from './ButtonSubmit';
import { useEffect, useState } from 'react';
import { Input } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { useRouter } from 'next/navigation';
import { DASHBOARD_PATH } from '@utils/paths';
import Image from 'next/image';
import T1EnviosLogo from '@assets/T1envios.png';
import styles from '@styles/auth/LoginForm.module.scss';

export default function LoginForm() {

    const [state, action] = useFormState(loginAction, undefined);
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    const router = useRouter();

    useEffect(() => {
        if (typeof state === 'string') {
            router.push(DASHBOARD_PATH);
        }
    }, [state]);//eslint-disable-line

    return (
        <div className={`flex w-full items-center justify-center ${styles.container}`}>
            <div className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 lg:shadow-small">
                <Image
                    src={T1EnviosLogo}
                    alt='t1 envios'
                    width={130}
                    height={32}
                />
                <form className="flex flex-col gap-3" action={action}>
                    <Input
                        label="Usuario"
                        name="username"
                        placeholder="Escribe tu usuario"
                        variant="bordered"
                        required
                    />
                    <Input
                        endContent={
                            <button type="button" onClick={toggleVisibility}>
                                {isVisible ? (
                                    <Icon
                                        className="pointer-events-none text-2xl text-default-400"
                                        icon="solar:eye-closed-linear"
                                    />
                                ) : (
                                    <Icon
                                        className="pointer-events-none text-2xl text-default-400"
                                        icon="solar:eye-bold"
                                    />
                                )}
                            </button>
                        }
                        label="Contraseña"
                        required
                        name="password"
                        placeholder="Escribe tu contraseña"
                        type={isVisible ? "text" : "password"}
                        variant="bordered"
                    />
                    {
                        state?.error && <span className='pending'>{state?.error}</span>
                    }
                    <ButtonSubmit />
                </form>
            </div>
        </div>
    );
}