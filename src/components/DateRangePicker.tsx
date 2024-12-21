'use client';

import { parseDate } from "@internationalized/date";
import { DateRangePicker } from "@nextui-org/date-picker";
import dayjs from "dayjs";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export default function DatePickerForDashboard() {

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const params = new URLSearchParams(searchParams);
    const initDate = searchParams.get('initDate') || dayjs().tz('Mexico/General').format('YYYY-MM-DD');
    const endDate = searchParams.get('endDate') || dayjs().tz('Mexico/General').format('YYYY-MM-DD');
    const maxValue = parseDate(dayjs().tz('Mexico/General').format('YYYY-MM-DD'));

    const onChangeDateRange = (initDate: string, endDate: string) => {
        params.set('initDate', initDate);
        params.set('endDate', endDate);
        params.set('request-only-analysis-by-client', 'false');
        replace(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="flex justify-end mb-4">
            <DateRangePicker
                label='Periodo'
                className="lg:w-80"
                calendarWidth={'256px' as any}
                maxValue={maxValue}
                defaultValue={{
                    end: parseDate(endDate),
                    start: parseDate(initDate)
                }}
                onChange={(range) => onChangeDateRange(range.start.toString(), range.end.toString())}
            />
        </div>
    );
}