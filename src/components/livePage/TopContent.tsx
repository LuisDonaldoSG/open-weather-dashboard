'use client';

import TotalAndPageSizeSelector from "@components/TotalsAndPageSizeSelector";
import { TopContentWithTotalAndPageSizeI } from "@interfaces/props";
import { Input } from "@nextui-org/react";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function TopContent({ totalItem }: TopContentWithTotalAndPageSizeI) {

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const params = new URLSearchParams(searchParams);
    const commerce = searchParams.get('commerce') || '';

    const debouncedCommerce = useDebouncedCallback((value) => {
        params.set('pageSize', '10');
        params.set('page', '1');
        params.set('commerce', value);
        replace(`${pathname}?${params.toString()}`);
    }, 500);

    const handleOnClear = () => {
        params.set('pageSize', '10');
        params.set('page', '1');
        params.delete('commerce');
        replace(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="flex items-start flex-col gap-2 w-full">
            <Input
                isClearable
                className="sm:max-w-[44%] lg:w-96"
                label="Buscar por nombre de comercio..."
                defaultValue={commerce}
                onChange={event => debouncedCommerce(event.target.value)}
                onClear={handleOnClear}
            />
            <TotalAndPageSizeSelector
                totalItems={totalItem || 0}
            />
        </div>
    );
}