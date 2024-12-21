import { HomeI } from "@interfaces/props";
import { getOverweight } from "@services/overweight";
import { overweightColumns } from "@utils/columns";
import TableSection from "@components/homePage/TableSection";
import { Card } from "@nextui-org/react";
import TopContent from "@components/homePage/TopContent";
import { numberFormat } from "@utils/dataFormatter";
import { OverweightI } from "@interfaces/finances";

export default async function FetchDataAndRender(searchParams: HomeI) {

    const page = searchParams?.page || '1';
    const pageSize = searchParams?.pageSize || '10';
    const batch = searchParams?.batch || '';
    const commerce = searchParams?.commerce || '';
    const commerceName = searchParams?.commerceName || '';
    const status = searchParams?.status || '';
    const overweight = await getOverweight(page, pageSize, batch, commerce, status, commerceName);
    const dataPaid = overweight.statusSummary.find(summary => summary.status === '1');
    const dataPending = overweight.statusSummary.find(summary => summary.status === '0');
    const columnsToShowWhenCommerceParamsExist = ['courier', 'overweights', 'batch'];
    const columnsToHideWhenCommerceParamsExist = ['count', 'commerce', 'actions'];

    const getFilteredColumns = () => {
        if (commerce) {
            return overweightColumns.filter(column => !columnsToHideWhenCommerceParamsExist.includes(column.uid));
        } else {
            return overweightColumns.filter(column => !columnsToShowWhenCommerceParamsExist.includes(column.uid));
        }
    };

    return (
        <main>
            <header className="grid grid-cols-2 gap-4 mb-4">
                <Card
                    className={`p-4`}
                    shadow="sm"
                >
                    <span>Total de sobrepesos: {numberFormat(overweight.appliedCharges)}</span>
                </Card>
                <Card
                    className={`p-4`}
                    shadow="sm"
                >
                    <span>Pagado: {dataPaid ? <span className="paid">{numberFormat(dataPaid.totalCharge)}</span> : '$0.00'}</span>
                </Card>
                <Card
                    className={`p-4`}
                    shadow="sm"
                >
                    <span>Mensajerías: {overweight.percentage[0].courier} ({overweight.percentage[0].percentage}) - {overweight.percentage[overweight.percentage.length - 1].courier} ({overweight.percentage[overweight.percentage.length - 1].percentage})</span>
                </Card>
                <Card
                    className={`p-4`}
                    shadow="sm"
                >
                    <span>Pendiente: {dataPending ? <span className="pending">{numberFormat(dataPending.totalCharge)}</span> : '$0.00'}</span>
                </Card>
            </header>
            <TableSection<OverweightI>
                data={overweight.data}
                totalPages={overweight.totalPages}
                columns={getFilteredColumns()}
                topContent={<TopContent totalItems={overweight.totalItems} />}
            />
        </main>
    );
}