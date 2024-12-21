import CardCounter from "@components/dashboardPage/CardCounter";
import { FinancesI } from "@interfaces/props";
import { getGeneralFinances } from "@services/finances";
import { numberFormat , formatWithCommas} from "@utils/dataFormatter";
import dayjs from "dayjs";

export default async function FetchDataAndRender(searchParams: FinancesI) {

    const year = searchParams.year || (dayjs().get('month') + 1).toString();
    const month = searchParams.month || dayjs().get('year').toString();
    const generalFinances = await getGeneralFinances(month, year);

    return (
        <section className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <span className="text-xl">Factura</span>
                <div className="flex fle-col lg:flex-row gap-2 flex-wrap">
                    <CardCounter
                        title="Total Pagado"
                        value={numberFormat(generalFinances.data?.total_paid || 0)}
                        className="w-full lg:w-auto"
                    />
                </div>
            </div>
            <div className="flex flex-col gap-2 flex-wrap">
                <span className="text-xl">Detalle Factura</span>
                <div className="flex fle-col lg:flex-row gap-4 flex-wrap">
                    <CardCounter
                        title="Pagado meses pasados"
                        value={numberFormat(generalFinances.data?.paid_past_months || 0)}
                        className="w-full lg:w-auto"
                    />
                    <CardCounter
                        title="Pagado meses actual"
                        value={numberFormat(generalFinances.data?.paid_current_month || 0)}
                        className="w-full lg:w-auto"
                    />
                    <CardCounter
                        title="Pendiente por pagar"
                        value={numberFormat(generalFinances.data?.pending_to_pay || 0)}
                        className="w-full lg:w-auto"
                    />
                    <CardCounter
                        title="Pendiente por pagar sin cotización"
                        value={formatWithCommas(generalFinances.data?.pending_noquote || 0)}
                        className="w-full lg:w-auto"
                    />
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <span className="text-xl">Guías en sistemas</span>
                <div className="flex fle-col lg:flex-row gap-4 flex-wrap">
                    <CardCounter
                        title="Cobro total a sellers"
                        value={numberFormat(generalFinances.data?.current_month_charged || 0)}
                        className="w-full lg:w-auto"
                    />
                    <CardCounter
                        title="Total generado sin cotización"
                        value={formatWithCommas(generalFinances.data?.current_month_noquote || 0)}
                        className="w-full lg:w-auto"
                    />
                </div>
            </div>
        </section>
    );
}