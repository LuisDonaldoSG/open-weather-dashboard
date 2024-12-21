'use client';

import { Button, Select, SelectItem } from "@nextui-org/react";
import { REQUIRED_ERROR_MESSAGE } from "@utils/staticData";
import dayjs from "dayjs";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { Controller, useForm } from "react-hook-form";

export default function CustomDatePicker() {

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const params = new URLSearchParams(searchParams);
    const month = searchParams.get('month') || (dayjs().get('month') + 1).toString();
    const year = searchParams.get('year') || dayjs().get('year').toString();
    const { handleSubmit, formState: { errors }, control } = useForm<{ month: string, year: string }>({
        mode: 'onChange',
        defaultValues: {
            month,
            year
        }
    });

    const submit = (data: { month: string, year: string }) => {
        params.set('month', data.month);
        params.set('year', data.year);
        replace(`${pathname}?${params.toString()}`);
    };

    return (
        <form
            className="w-full lg:w-100 max-w-xl flex flex-row gap-4 items-center flex-col lg:flex-row"
            onSubmit={handleSubmit(submit)}
        >
            <div className="w-full lg:w-auto max-w-xl flex flex-row gap-4 items-center">
                <Controller
                    control={control}
                    name="month"
                    rules={{ required: REQUIRED_ERROR_MESSAGE }}
                    render={({ field: { onChange, value } }) => (
                        <Select
                            label='Mes'
                            className="lg:w-40"
                            size="sm"
                            defaultSelectedKeys={[month]}
                            selectedKeys={[value]}
                            onChange={(event) => onChange(event.target.value)}
                        >
                            <SelectItem key={'1'}>Enero</SelectItem>
                            <SelectItem key={'2'}>Febrero</SelectItem>
                            <SelectItem key={'3'}>Marzo</SelectItem>
                            <SelectItem key={'4'}>Abril</SelectItem>
                            <SelectItem key={'5'}>Mayo</SelectItem>
                            <SelectItem key={'6'}>Junio</SelectItem>
                            <SelectItem key={'7'}>Julio</SelectItem>
                            <SelectItem key={'8'}>Agosto</SelectItem>
                            <SelectItem key={'9'}>Septiembre</SelectItem>
                            <SelectItem key={'10'}>Octubre</SelectItem>
                            <SelectItem key={'11'}>Noviembre</SelectItem>
                            <SelectItem key={'12'}>Diciembre</SelectItem>
                        </Select>
                    )}
                />
                <Controller
                    control={control}
                    name="year"
                    rules={{ required: REQUIRED_ERROR_MESSAGE }}
                    render={({ field: { onChange, value } }) => (
                        <Select
                            label='Año'
                            className="lg:w-40"
                            size="sm"
                            defaultSelectedKeys={[year]}
                            selectedKeys={[value]}
                            onChange={(event) => onChange(event.target.value)}
                        >
                            <SelectItem key={'2024'}>2024</SelectItem>
                        </Select>
                    )}
                />
            </div>
            <Button
                isDisabled={Object.keys(errors).length > 0}
                className="w-full lg:w-auto"
                type="submit"
                color="primary"
            >
                Buscar
            </Button>
        </form>
    );
}