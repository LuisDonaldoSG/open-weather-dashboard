'use client';

import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from '@styles/layout/LinkItem.module.scss';
import { useMemo, useState } from "react";
import { LinkItemI } from "@interfaces/props";

export default function LinkItem({ dataLink, nameForSubPath }: LinkItemI) {

    const pathname = usePathname();
    const [openSubPaths, setOpenSubPaths] = useState<boolean>(false);

    useMemo(() => {
        if (openSubPaths && Array.isArray(dataLink.pathData) && dataLink.pathData.some(data => data.route !== pathname)) {
            setOpenSubPaths(false);
        }

        if (!openSubPaths && Array.isArray(dataLink.pathData) && dataLink.pathData.some(data => data.route === pathname)) {
            setOpenSubPaths(true);
        }
    }, [pathname]) //eslint-disable-line

    return (
        <>
            {
                Array.isArray(dataLink.pathData) ? <div
                    className={`flex flex-col gap-2 ${styles['sub-paths-container']}`}
                    data-open={openSubPaths}
                >
                    <button
                        className={`${styles.item} flex gap-2 items-center justify-between`}
                        data-selected={dataLink.pathData.some(data => data.route === pathname)}
                        onClick={() => setOpenSubPaths(open => !open)}
                        data-is-button={true}
                    >
                        {nameForSubPath}
                    </button>
                    {
                        dataLink.pathData.map((data, index) => (
                            <Link
                                key={index}
                                href={data.route}
                                className={styles.subpath}
                                data-selected={pathname === data.route}
                            >
                                {data.alias}
                            </Link>
                        ))
                    }
                </div> : <Link
                    className={`${styles.item} flex gap-2 items-center justify-between`}
                    href={dataLink.pathData.route}
                    data-selected={pathname === dataLink.pathData.route}
                >
                    {dataLink.pathData.alias}
                </Link>
            }
            <hr className="bg-white"/>
        </>

    );
}