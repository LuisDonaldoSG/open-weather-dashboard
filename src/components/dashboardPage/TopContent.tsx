'use client';

import TotalAndPageSizeSelector from "@components/TotalsAndPageSizeSelector";
import { TopContentTableDashboardI, TopContentWithTotalAndPageSizeI } from "@interfaces/props";
import { Input } from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function TopContent({ title, totalAndPageSize, totalItem , renderSearch}: TopContentTableDashboardI & TopContentWithTotalAndPageSizeI) {

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const params = new URLSearchParams(searchParams);
    const search = searchParams.get('search') || '';

    const debouncedSearch = useDebouncedCallback((value) => {
        params.set('pageSize', '10');
        params.set('page', '1');
        params.set('request-only-analysis-by-client', 'true');
        params.set('search', value);
        replace(`${pathname}?${params.toString()}`, {
            scroll: false
        });
    }, 500);

    const handleOnClear = () => {
        params.set('pageSize', '10');
        params.set('page', '1');
        params.delete('search');
        replace(`${pathname}?${params.toString()}`, {
            scroll: false
        });
    };

    return (
        <div className="w-full flex flex-col gap-4">
            <span className="text-lg">{title}</span>
            {
                renderSearch && <Input
                    isClearable
                    size="sm"
                    className="sm:max-w-[44%] lg:w-96"
                    label="Buscar por nombre de comercio..."
                    defaultValue={search}
                    onChange={event => debouncedSearch(event.target.value)}
                    onClear={handleOnClear}
                />
            }
            {
                totalAndPageSize && <TotalAndPageSizeSelector
                    totalItems={totalItem || 0}
                />
            }
        </div>
    );
};