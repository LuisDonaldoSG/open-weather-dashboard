'use server';

import { OverweighByParcelI, OverweightResponseI, PaginationI } from "@interfaces/finances";
import { HOME_PATH, OVERWEIGHT_LIVE_PATH } from "@utils/paths";
import { revalidatePath } from "next/cache";
import { auth } from "@root/auth";
import { ResponseI } from "@interfaces/response";

const baseUrl = process.env.T1_ENVIOS_API_URL;
const baseUrlV = process.env.API_V2_DASHBOARD_URL;

export async function getOverweight(page: string, pageSize: string, batch: string, commerce: string, status: string, commerceName: string): Promise<OverweightResponseI> {
    try {
        revalidatePath(HOME_PATH);
        const urlToWithFilters = `${baseUrl}shipping-guide/get-overweight-all/page/${page}/records/${pageSize}?${batch ? `batch=${batch}&` : ''}${commerce ? `commerce=${commerce}&` : ''}${status !== '' ? `status=${status}&` : ''}${commerceName !== '' ? `commerceName=${commerceName}&` : ''}`;
        console.log(`fetching: ${urlToWithFilters}`);
        const response = await fetch(urlToWithFilters);
        const data = await response.json() as OverweightResponseI;
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
        throw new Error(`failed request`);
    }
}

export async function getOverweightByParcel(page: string, pageSize: string, initDate: string, endDate: string, commerce: string): Promise<ResponseI<OverweighByParcelI[]> & { pagination: PaginationI }> {
    try {
        const urlToWithFilters = `${baseUrlV}finance/dhloverweight?page=${page}&per_page=${pageSize}&start_date=${initDate}&end_date=${endDate}&commerce=${commerce}&overweight=true`;
        const session = await auth();
        console.log(`fetching: ${urlToWithFilters}`);
        const response = await fetch(urlToWithFilters, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${session?.user.token}`
            }
        });
        const data = await response.json() as ResponseI<OverweighByParcelI[]> & { pagination: PaginationI };
        console.log(data);
        revalidatePath(OVERWEIGHT_LIVE_PATH);
        return data;
    } catch (error) {
        console.log(error);
        throw new Error(`failed request`);
    }
}