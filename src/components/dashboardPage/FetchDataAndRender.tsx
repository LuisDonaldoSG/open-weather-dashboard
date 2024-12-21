import TableSection from "@components/homePage/TableSection";
import { CommerceDataI, ParcelDataI, PaymentMethodI } from "@interfaces/finances";
import { getDashboardData } from "@services/dashboard";
import { analysisByClientColumn, analysisByParcelColumns, refillsByPaymentMethodColumns } from "@utils/columns";
import TopContent from "@components/dashboardPage/TopContent";
import DateRangePicker from "@components/DateRangePicker";
import { DashboardI } from "@interfaces/props";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import CardCounter from "@components/dashboardPage/CardCounter";
import { formatWithCommas } from "@utils/dataFormatter";
import Loading from "app/(protected)/loading";
import { Progress } from "@nextui-org/react";

dayjs.extend(utc);
dayjs.extend(timezone);

export default async function FetchDataAndRender(searchParams: DashboardI) {

    const initDate = searchParams?.initDate || dayjs().tz('Mexico/General').format('YYYY-MM-DD');
    const endDate = searchParams?.endDate || dayjs().tz('Mexico/General').format('YYYY-MM-DD');
    const search = searchParams.search || '';
    const page = searchParams?.page || '1';
    const pageSize = searchParams?.pageSize || '10';
    const requestAllDashboard = searchParams && searchParams['request-only-analysis-by-client'] || 'false';
    let dashboardData = null;
    let analysisByClient, refillByPaymentMethod, analysisByParcels, totalShippings, totalIncomes, margin, totalBalance = undefined;
    if (!searchParams.noRequest) {

        dashboardData = await getDashboardData(initDate, endDate, page, pageSize, requestAllDashboard === 'true', search);
        analysisByClient = dashboardData[0];
        refillByPaymentMethod = dashboardData[1];
        analysisByParcels = dashboardData[2];
        totalShippings = dashboardData[3];
        totalIncomes = dashboardData[4];
        margin = dashboardData[5];
        totalBalance = dashboardData[6];

        if (analysisByParcels && analysisByParcels.body.data.length > 0) {
            analysisByParcels?.body.data.push({
                paqueteria: 'Total',
                ingresos: analysisByParcels.body.totales.ingresos,
                margen: analysisByParcels.body.totales.margen,
                porcentaje_redondeado: analysisByParcels.body.totales.porcentaje,//eslint-disable-line
                envios: analysisByParcels.body.totales.envios,
                mensajeria_id: 0//eslint-disable-line
            });
        }
        if (refillByPaymentMethod && refillByPaymentMethod.body.data.length > 0) {
            refillByPaymentMethod?.body.data.push({
                forma_pago: 'Total',//eslint-disable-line
                total_monto: refillByPaymentMethod.body.total,//eslint-disable-line
                id_forma_pago: NaN//eslint-disable-line
            });
        }
        if (analysisByClient && analysisByClient.body.data.length > 0) {
            analysisByClient?.body.data.push({
                comercio: 'Total',
                ingreso: analysisByClient.body.totals.total_ingreso,
                margen: analysisByClient.body.totals.total_margen,//eslint-disable-line
                margen_porcentaje: Number(analysisByClient.body.totals.margen_porcentaje),//eslint-disable-line
                total_envios: analysisByClient.body.totals.total_envios,//eslint-disable-line
                saldo: analysisByClient.body.totals.total_saldo,
                nombre_configuracion: '',//eslint-disable-line
                id: NaN
            });
        }
    }

    return (
        <main>
            {
                searchParams.generalLoading ? <Loading /> : <>
                    <DateRangePicker />
                    <header className="grid grid-cols-2 gap-5 mb-4">
                        <CardCounter
                            title="Total de envíos"
                            value={totalShippings ? formatWithCommas(totalShippings.body.totalShipments) : undefined}
                            id='0'
                        />
                        <CardCounter
                            title="Ingresos"
                            value={totalIncomes ? totalIncomes.body.income : undefined}
                            id='1'
                        />
                        <CardCounter
                            title="Margen"
                            value={margin ? margin.body.margin : undefined}
                            percentage={margin ? margin.body.margin_percentage : undefined}
                            id='2'
                        />
                        <CardCounter
                            title="Saldo Activo"
                            value={totalBalance ? `$ ${totalBalance.body.total_active_balance}` : undefined}
                            id='3'
                        />
                    </header>
                    <div className='flex flex-col gap-4'>
                        <section className="flex flex-col gap-5 lg:flex-row">
                            <TableSection<ParcelDataI>
                                topContent={<TopContent title='Análisis por paquetería' />}
                                data={analysisByParcels?.body.data}
                                columns={analysisByParcelColumns}
                                className="lg:w-3/5 h-full"
                                id='0'
                                footer
                            />
                            <TableSection<PaymentMethodI>
                                topContent={<TopContent title='Análisis de recargas' />}
                                data={refillByPaymentMethod?.body.data}
                                columns={refillsByPaymentMethodColumns}
                                className="lg:w-2/5 h-full"
                                id='1'
                                footer
                            />
                        </section>
                        {
                            searchParams.tableClientLoading ? <TableSection<CommerceDataI>
                                topContent={<Progress isIndeterminate size="sm" aria-labelledby="cargando.." />}
                                data={analysisByClient?.body.data}
                                columns={analysisByClientColumn}
                                totalPages={analysisByClient?.body?.pagination ? analysisByClient.body?.pagination.totalPages : undefined}
                                id='2'
                                footer
                            /> : <TableSection<CommerceDataI>
                                data={analysisByClient?.body.data}
                                columns={analysisByClientColumn}
                                totalPages={analysisByClient?.body?.pagination ? analysisByClient.body?.pagination.totalPages : undefined}
                                id='2'
                                footer
                                topContent={
                                    <TopContent 
                                        title='Análisis por cliente' 
                                        totalItem={analysisByClient?.body.pagination?.totalCount} 
                                        totalAndPageSize 
                                        renderSearch
                                    />
                                }
                            />
                        }
                    </div>
                </>
            }
        </main>
    );
}