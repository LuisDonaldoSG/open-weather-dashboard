'use client';

import React, { useEffect, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, SortDescriptor } from "@nextui-org/react";
import RenderCell from "@components/homePage/RenderCell";
import BottomContent from "./BottomContent";
import { TableSectionI } from "@interfaces/props";
import { useSearchParams } from 'next/navigation';

export default function TableSection<I>({
    data,
    totalPages,
    columns,
    className,
    topContent,
    id,
    footer
}: TableSectionI<I>) {

    const [dataState, setDataState] = useState<I[]>([]);
    const searchParams = useSearchParams();
    const requestOnlyAnalysisByClient = searchParams.get('request-only-analysis-by-client') || 'false';
    const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
        column: "",
        direction: "ascending",
    });

    useEffect(() => {
        if (data) {
            setDataState(data);
            localStorage.setItem(`tableSection-${id}`, JSON.stringify(data));
        } else if (requestOnlyAnalysisByClient === 'true') {
            const dataFromLocalStorage = localStorage.getItem(`tableSection-${id}`);
            const tempData = JSON.parse(dataFromLocalStorage || '[]');
            setDataState(tempData);
        }
    }, [data]);//eslint-disable-line

    const sortedItems = React.useMemo(() => {
        if (footer && dataState.length > 0) {
            const tempStateData = [...dataState];
            let footerRow = tempStateData.pop() as I;
            tempStateData.sort((a: I, b: I) => {
                const first = typeof (a[sortDescriptor.column as keyof I]) === 'string' ? Number(a[sortDescriptor.column as keyof I]) : a[sortDescriptor.column as keyof I] as number;
                const second = typeof (b[sortDescriptor.column as keyof I]) === 'string' ? Number(b[sortDescriptor.column as keyof I]) : b[sortDescriptor.column as keyof I] as number;
                const cmp = first < second ? -1 : first > second ? 1 : 0;
                return sortDescriptor.direction === "descending" ? -cmp : cmp;
            });
            tempStateData.push(footerRow);
            return tempStateData;
        } else {
            return [...dataState].sort((a: I, b: I) => {
                const first = typeof (a[sortDescriptor.column as keyof I]) === 'string' ? Number(a[sortDescriptor.column as keyof I]) : a[sortDescriptor.column as keyof I] as number;
                const second = typeof (b[sortDescriptor.column as keyof I]) === 'string' ? Number(b[sortDescriptor.column as keyof I]) : b[sortDescriptor.column as keyof I] as number;
                const cmp = first < second ? -1 : first > second ? 1 : 0;
                return sortDescriptor.direction === "descending" ? -cmp : cmp;
            });
        }
    }, [sortDescriptor, dataState, footer]);

    return (
        <Table
            aria-label='table'
            className={className}
            isHeaderSticky
            sortDescriptor={sortDescriptor}
            onSortChange={setSortDescriptor}
            bottomContentPlacement="outside"
            topContentPlacement="outside"
            bottomContent={totalPages !== undefined &&
                <BottomContent
                    pages={totalPages}
                />
            }
            topContent={topContent}
        >
            <TableHeader columns={columns}>
                {
                    (column) => (
                        <TableColumn
                            align={(column.uid === 'commerce' || column.uid === 'name') ? 'start' : 'center'}
                            key={column.uid}
                            allowsSorting={column.sortable}
                        >
                            {column.name}
                        </TableColumn>
                    )
                }
            </TableHeader>
            <TableBody
                emptyContent={"No hay datos"}
                items={sortedItems}
            >
                {
                    sortedItems.map((item, index) => (
                        <TableRow
                            key={index}
                            className={footer ? 'last:bg-neutral-100 last:shadow-small last:rounded-lg' : undefined}
                        >
                            {
                                (columnKey) => <TableCell className={footer ? 'last:rounded-r-lg first:rounded-l-lg' : undefined}>
                                    <RenderCell<I>
                                        columnKey={columnKey}
                                        row={item}
                                    />
                                </TableCell>
                            }
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    );
}