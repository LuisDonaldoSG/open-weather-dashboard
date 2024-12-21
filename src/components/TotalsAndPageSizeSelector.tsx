'use client';

import { TotalAndPageSizeSelectorI } from "@interfaces/props";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function TotalAndPageSizeSelector({ totalItems }: TotalAndPageSizeSelectorI) {

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const params = new URLSearchParams(searchParams);
    const pageSize = searchParams.get('pageSize') || '10';

    const onChangePageSize = (pageSize: string) => {
        params.set('pageSize', pageSize);
        params.set('request-only-analysis-by-client', 'true');
        params.set('page', '1');
        replace(`${pathname}?${params.toString()}`, {
            scroll: false
        });
    };

    return (
        <div className="flex justify-between items-center w-full">
            <span className=" text-small">Total {totalItems} registros</span>
            <label className="flex items-center text-small">
                Filas por pagina:
                <select
                    className="bg-transparent outline-none text-small"
                    defaultValue={pageSize}
                    onChange={event => onChangePageSize(event.target.value)}
                >
                    <option value="10">10</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
            </label>
        </div>
    );
}