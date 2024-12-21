import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { LiveI } from '@interfaces/props';
import { getOverweightByParcel } from '@services/overweight';
import TableSection from '@components/homePage/TableSection';
import { OverweighByParcelI } from '@interfaces/finances';
import { overweightByClientColumn } from '@utils/columns';
import DateRangePicker from '@components/DateRangePicker';
import TopContent from '@components/livePage/TopContent';

dayjs.extend(utc);
dayjs.extend(timezone);

export default async function FetchDataAndRender(searchParams: LiveI) {

    const initDate = searchParams?.initDate || dayjs().tz('Mexico/General').format('YYYY-MM-DD');
    const endDate = searchParams?.endDate || dayjs().tz('Mexico/General').format('YYYY-MM-DD');
    const page = searchParams?.page || '1';
    const pageSize = searchParams?.pageSize || '10';
    const commerce = searchParams?.commerce || '';
    const overweightByParcel = await getOverweightByParcel(page, pageSize, initDate, endDate, commerce);

    return (
        <main>
            <DateRangePicker />
            <TableSection<OverweighByParcelI>
                data={overweightByParcel?.data || []}
                columns={overweightByClientColumn}
                totalPages={overweightByParcel.pagination.total_pages}
                topContent={<TopContent totalAndPageSize totalItem={overweightByParcel.pagination.total_records}/>}
            />
        </main>
    );
}