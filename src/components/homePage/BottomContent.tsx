'use client';

import { BottomContentI } from "@interfaces/props";
import { Button, Pagination } from "@nextui-org/react";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function BottomContent({
    pages,
}: BottomContentI) {

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const params = new URLSearchParams(searchParams);
    const currentPage = Number(searchParams.get('page')?.toString()) || 1;

    const onChangePage = (page: number) => {
        params.set('page', page.toString());
        params.set('request-only-analysis-by-client', 'true');
        replace(`${pathname}?${params.toString()}`, {
            scroll: false
        });
    };

    const onPreviousPage = () => {
        if (currentPage >= 1) {
            params.set('page', (currentPage - 1).toString());
            params.set('request-only-analysis-by-client', 'true');
            replace(`${pathname}?${params.toString()}`, {
                scroll: false
            });
        }
    };

    const onNextPage = () => {
        if (currentPage < pages) {
            params.set('page', (currentPage + 1).toString());
            params.set('request-only-analysis-by-client', 'true');
            replace(`${pathname}?${params.toString()}`, {
                scroll: false
            });
        }
    };

    return (
        <div className="py-2 px-2 flex justify-center lg:justify-between items-center">
            <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={currentPage}
                total={pages}
                onChange={onChangePage}
            />
            <div className="hidden sm:flex w-[30%] justify-end gap-2">
                <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
                    Anterior
                </Button>
                <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
                    Siguiente
                </Button>
            </div>
        </div>
    );
};