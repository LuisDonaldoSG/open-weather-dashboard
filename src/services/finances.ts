'use sever';

import { GeneralFinancesI } from "@interfaces/finances";
import { ResponseI } from "@interfaces/response";
import { auth } from "@root/auth";
import { FINANCE_PATH } from "@utils/paths";
import { revalidatePath } from "next/cache";

const baseUrlV = process.env.API_V2_DASHBOARD_URL;

export async function getGeneralFinances(month: string, year: string): Promise<ResponseI<GeneralFinancesI>> {
    try {
        const urlToWithFilters = `${baseUrlV}finance/invoice-report?month=${month}&year=${year}`;
        const session = await auth();
        console.log(`fetching: ${urlToWithFilters}`);
        const response = await fetch(urlToWithFilters, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${session?.user.token}`
            }
        });
        const data = await response.json() as ResponseI<GeneralFinancesI>;
        console.log(data);
        revalidatePath(FINANCE_PATH);
        return data;
    } catch (error) {
        console.log(error);
        throw new Error(`failed request`);
    }
}