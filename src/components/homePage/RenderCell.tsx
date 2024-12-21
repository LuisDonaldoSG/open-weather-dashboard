'use client';

import { Button, Chip } from "@nextui-org/react";
import { RenderCellI } from "@interfaces/props";
import { numberFormat } from "@utils/dataFormatter";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useSearchParams, usePathname } from 'next/navigation';
import Link from "next/link";
import Image from 'next/image';
import { imagesParcelsMapped } from "@utils/imageMapped";
import { OverweightI } from "@interfaces/finances";

export default function RenderCell<I>({ columnKey, row }: RenderCellI<I>) {

    const cellValue = row[columnKey as keyof I];
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const params = new URLSearchParams(searchParams);

    const goToPage = (): string => {
        const rowOverweight = row as OverweightI;
        params.set('pageSize', '10');
        params.set('page', '1');
        params.set('commerce', rowOverweight.commerce as string || '');
        return `${pathname}?${params.toString()}`;
    };

    switch (columnKey) {
    case 'peso_cotizado':
        return <span>{cellValue as string} kg</span>;
    case 'overweight_flag':
        return cellValue as number === 1 ? <Chip
            size="sm"
            style={{
                backgroundColor: '#fcf8ee',
                color: '#ecbe47'
            }}
        >
                Sobrepeso
        </Chip> : null;
    case 'peso_reportado':
        return cellValue as string | number !== null ? <span>{cellValue as string | number} kg</span> : null;
    case 'paqueteria':
        return imagesParcelsMapped[cellValue as string] ? (
            <figure>
                <Image
                    src={imagesParcelsMapped[cellValue as string]}
                    alt={cellValue as string}
                    className="h-5 w-24 object-contain"
                />
            </figure>
        ) : cellValue as string;
    case 'overweights':
        return (
            `${cellValue as number} kg`
        );
    case 'totalCharge':
        return (
            numberFormat(cellValue as number)
        );
    case 'margen':
        return (
            numberFormat(cellValue as number)
        );
    case 'ingresos':
        return (
            numberFormat(cellValue as number)
        );
    case 'ingreso':
        return (
            numberFormat(cellValue as number)
        );
    case 'margen_porcentaje':
        return (
            `${cellValue as number}%`
        );
    case 'porcentaje_redondeado':
        return (
            `${cellValue as number}%`
        );
    case 'saldo':
        return (
            numberFormat(cellValue as number)
        );
    case 'total_monto':
        return (
            numberFormat(cellValue as number)
        );
    case 'totalChargeStatusPending':
        return (
            <span className={Number(cellValue) > 0 ? 'pending' : undefined}>{numberFormat(cellValue as number)}</span>
        );
    case "actions":
        return (
            <Link href={goToPage()}>
                <Button
                    isIconOnly
                    variant="light"
                >
                    <RemoveRedEyeIcon />
                </Button>
            </Link>
        );
    default:
        return cellValue;
    }
};
