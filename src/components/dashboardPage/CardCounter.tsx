'use client';

import { CardCounterI } from "@interfaces/props";
import { Card, Chip, cn } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';
import { Icon } from "@iconify/react/dist/iconify.js";

export default function CardCounter({ value, title, percentage, id, className }: CardCounterI) {

    const [valueState, setValueState] = useState<string>('');
    const searchParams = useSearchParams();
    const requestOnlyAnalysisByClient = searchParams.get('request-only-analysis-by-client') || 'false';

    useEffect(() => {
        if (value) {
            setValueState(value);
            if (id) localStorage.setItem(`counterValue-${id}`, value);
        } else if (requestOnlyAnalysisByClient === 'true') {
            const dataFromLocalStorage = localStorage.getItem(`counterValue-${id}`);
            const tempValue = dataFromLocalStorage || '';
            setValueState(tempValue);
        };
    }, [value]);//eslint-disable-line

    return (
        <Card 
            className={`border border-transparent dark:border-default-100 ${className}`}
            shadow="sm"
        >
            <div className="flex p-4">
                <div className="flex flex-col gap-y-2">
                    <dt className="text-small font-medium text-default-500">{title}</dt>
                    <dd className="lg:text-2xl font-semibold text-default-700">{valueState}</dd>
                </div>
                {
                    percentage && <Chip
                        className={cn("absolute right-4", {
                            "bottom-4": true,
                        })}
                        classNames={{
                            content: "font-medium text-[0.65rem]",
                        }}
                        color='success'
                        radius="sm"
                        size="sm"
                        startContent={<Icon height={12} icon={"solar:arrow-right-up-linear"} width={12} />}
                        variant='flat'
                    >
                        {percentage}
                    </Chip>
                }
            </div>
        </Card>
    );
}