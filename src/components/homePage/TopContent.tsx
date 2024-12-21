'use client';

import React from "react";
import { Input, Select, SelectItem } from "@nextui-org/react";
import { TopContentI } from "@interfaces/props";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import TotalAndPageSizeSelector from "@components/TotalsAndPageSizeSelector";

export default function TopContent({ totalItems }: TopContentI) {

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const params = new URLSearchParams(searchParams);
    const batch = searchParams.get('batch') || '';
    const commerce = searchParams.get('commerce') || '';
    const commerceName = searchParams.get('commerceName') || '';
    const status = searchParams.get('status') || '';

    const handleChangeBatch = (value: string) => {
        params.set('pageSize', '10');
        params.set('page', '1');
        params.set('batch', value);
        replace(`${pathname}?${params.toString()}`);
    };

    const debouncedCommerce = useDebouncedCallback((value) => {
        params.set('pageSize', '10');
        params.set('page', '1');
        params.set('commerce', value);
        replace(`${pathname}?${params.toString()}`);
    }, 500);

    const debouncedCommerceName = useDebouncedCallback((value) => {
        params.set('pageSize', '10');
        params.set('page', '1');
        params.set('commerceName', value);
        replace(`${pathname}?${params.toString()}`);
    }, 500);

    const handleChangeStatus = (status: string) => {
        params.set('pageSize', '10');
        params.set('page', '1');
        params.set('status', status);
        replace(`${pathname}?${params.toString()}`);
    };

    const handleOnClear = () => {
        params.delete('batch');
        params.set('pageSize', '10');
        params.set('page', '1');
        params.delete('commerce');
        params.delete('commerceName');
        replace(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between gap-3 lg:items-end flex-col lg:flex-row">
                <div className="flex gap-3 items-center">
                    <Input
                        isClearable
                        className="sm:max-w-[44%] lg:w-96"
                        label="Buscar por nombre de comercio..."
                        defaultValue={commerceName}
                        onChange={event => debouncedCommerceName(event.target.value)}
                        onClear={handleOnClear}
                    />
                    <Input
                        isClearable
                        className="sm:max-w-[44%] lg:w-90"
                        label="Buscar por id de comercio..."
                        defaultValue={commerce}
                        onChange={event => debouncedCommerce(event.target.value)}
                        onClear={handleOnClear}
                    />
                </div>
                <div className="flex gap-3 lg:items-end w-100">
                    <Select
                        label='Estado'
                        className="lg:w-40"
                        defaultSelectedKeys={[status]}
                        onChange={event => handleChangeStatus(event.target.value)}
                    >
                        <SelectItem value={'0'} key={'0'}>Pediente</SelectItem>
                        <SelectItem value={'1'} key={'1'}>Pagado</SelectItem>
                    </Select>
                    <Select
                        label='Lote'
                        className="lg:w-40"
                        defaultSelectedKeys={[batch]}
                        onChange={event => handleChangeBatch(event.target.value)}
                    >
                        <SelectItem value={'JUL-AGO'} key={'JUL-AGO'}>JUL-AGO</SelectItem>
                        <SelectItem value={'SEP'} key={'SEP'}>SEP</SelectItem>
                        <SelectItem value={'OCT'} key={'OCT'}>OCT</SelectItem>
                    </Select>
                </div>
            </div>
            <TotalAndPageSizeSelector
                totalItems={totalItems}
            />
        </div>
    );
};