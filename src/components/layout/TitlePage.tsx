'use client';

import styles from '@styles/layout/TitlePage.module.scss';
import { paginatedPaths } from '@utils/paginatedPaths';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

export default function TitlePage() {

    const pathname = usePathname();
    const pageName =  useMemo<string | undefined>(() => {
        for (const key of Object.keys(paginatedPaths)) {
            const currentPage = paginatedPaths[key].pathData;
            if (Array.isArray(currentPage)) {
                const pageData = currentPage.find(page => page.route === pathname);
                if (pageData) return pageData?.alias;
            } else {
                if (currentPage.route === pathname) return currentPage.alias;
            }
        }
    }, [pathname]);

    return (
        <span className={styles.title}>
            {pageName}
        </span>
    );
}