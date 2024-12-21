'use server';

import { AnalysisByParcelI, CommerceDataByClientI, RefillsByPaymentMethod, TotalsCommerceDataByClientI } from "@interfaces/finances";
import { ResponseI } from "@interfaces/response";
import { auth } from "@root/auth";
import { DASHBOARD_PATH } from "@utils/paths";
import { revalidatePath } from "next/cache";

const baseUrlDashboard = process.env.API_V2_DASHBOARD_URL;

export async function getAnalysisByParcels(initDate: string, endDate: string): Promise<ResponseI<AnalysisByParcelI>> {
    const urlToWithFilters = `${baseUrlDashboard}overview?initDate=${initDate}&endDate=${endDate}`;
    try {
        console.log(`fetching: ${urlToWithFilters}`);
        const session = await auth();
        const response = await fetch(urlToWithFilters, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${session?.user.token}`
            }
        });
        const data = await response.json() as ResponseI<AnalysisByParcelI>;
        revalidatePath(DASHBOARD_PATH);
        console.log(data);
        return data;
    } catch (error) {
        throw new Error(`error with params: ${urlToWithFilters} ${error}`);
    }
}

export async function getRefillsByPaymentMethod(initDate: string, endDate: string): Promise<ResponseI<RefillsByPaymentMethod>> {
    const urlToWithFilters = `${baseUrlDashboard}rechargeByPaymentMethod?initDate=${initDate}&endDate=${endDate}`;
    try {
        console.log(`fetching: ${urlToWithFilters}`);
        const session = await auth();
        const response = await fetch(urlToWithFilters, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${session?.user.token}`
            }
        });
        const data = await response.json() as ResponseI<RefillsByPaymentMethod>;
        revalidatePath(DASHBOARD_PATH);
        console.log(data);
        return data;
    } catch (error) {
        throw new Error(`error with params: ${urlToWithFilters} ${error}`);
    }
}

export async function getAnalysisByClient(initDate: string, endDate: string, page: string, pageSize: string, search: string): Promise<ResponseI<CommerceDataByClientI & { totals: TotalsCommerceDataByClientI }>> {
    const urlToWithFilters = `${baseUrlDashboard}analysisBySellerPaginated?start_date=${initDate}&end_date=${endDate}&page=${page}&per_page=${pageSize}&search=${search}`;
    const urlTotalWithFilters = `${baseUrlDashboard}analysisBySellerTotals?start_date=${initDate}&end_date=${endDate}`;
    try {
        console.log(`fetching: ${urlToWithFilters}`);
        console.log(`fetching: ${urlTotalWithFilters}`);
        const session = await auth();
        const dataArray = await Promise.all([
            fetch(urlTotalWithFilters, {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${session?.user.token}`
                }
            }),
            fetch(urlToWithFilters, {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${session?.user.token}`
                }
            })
        ]);
        const [totalsResponse, commerceDataByClientResponse] = dataArray;
        const totals = await totalsResponse.json() as ResponseI<{ totales: TotalsCommerceDataByClientI }>;
        const commerceDataByClient = await commerceDataByClientResponse.json() as ResponseI<CommerceDataByClientI>;
        console.log(commerceDataByClient);
        revalidatePath(DASHBOARD_PATH);
        return {
            body: {
                totals: totals.body.totales,
                data: commerceDataByClient.body.data,
                pagination: commerceDataByClient.body.pagination
            },
            message: 'succeed',
            statusCode: 200,
            success: true
        };
    } catch (error) {
        throw new Error(`error with params: ${urlToWithFilters} ${error}`);
    }
}

export async function getTotalShippings(initDate: string, endDate: string): Promise<ResponseI<{ totalShipments: number }>> {
    const urlToWithFilters = `${baseUrlDashboard}totalShipments?initDate=${initDate}&endDate=${endDate}`;
    try {
        console.log(`fetching: ${urlToWithFilters}`);
        const session = await auth();
        const response = await fetch(urlToWithFilters, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${session?.user.token}`
            }
        });
        const data = await response.json() as ResponseI<{ totalShipments: number }>;
        revalidatePath(DASHBOARD_PATH);
        console.log(data);
        return data;
    } catch (error) {
        throw new Error(`error with params: ${urlToWithFilters} ${error}`);
    }
}

export async function getTotalIncomes(initDate: string, endDate: string): Promise<ResponseI<{ income: string }>> {
    const urlToWithFilters = `${baseUrlDashboard}income?initDate=${initDate}&endDate=${endDate}`;
    try {
        console.log(`fetching: ${urlToWithFilters}`);
        const session = await auth();
        const response = await fetch(urlToWithFilters, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${session?.user.token}`
            }
        });
        const data = await response.json() as ResponseI<{ income: string }>;
        revalidatePath(DASHBOARD_PATH);
        console.log(data);
        return data;
    } catch (error) {
        throw new Error(`error with params: ${urlToWithFilters} ${error}`);
    }
}

export async function getTotalMargin(initDate: string, endDate: string): Promise<ResponseI<{ margin: string, margin_percentage: string }>> {
    const urlToWithFilters = `${baseUrlDashboard}margin?initDate=${initDate}&endDate=${endDate}`;
    try {
        console.log(`fetching: ${urlToWithFilters}`);
        const session = await auth();
        const response = await fetch(urlToWithFilters, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${session?.user.token}`
            }
        });
        const data = await response.json() as ResponseI<{ margin: string, margin_percentage: string }>;
        revalidatePath(DASHBOARD_PATH);
        console.log(data);
        return data;
    } catch (error) {
        throw new Error(`error with params: ${urlToWithFilters} ${error}`);
    }
}

export async function getTotalBalance(initDate: string, endDate: string): Promise<ResponseI<{ total_active_balance: string }>> {
    const urlToWithFilters = `${baseUrlDashboard}totalBalance?initDate=${initDate}&endDate=${endDate}`;
    try {
        console.log(`fetching: ${urlToWithFilters}`);
        const session = await auth();
        const response = await fetch(urlToWithFilters, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${session?.user.token}`
            }
        });
        const data = await response.json() as ResponseI<{ total_active_balance: string }>;
        revalidatePath(DASHBOARD_PATH);
        console.log(data);
        return data;
    } catch (error) {
        throw new Error(`error with params: ${urlToWithFilters} ${error}`);
    }
}

export async function getDashboardData(initDate: string, endDate: string, page: string, pageSize: string, requestOnLyAnalysisByClient: boolean, search: string): Promise<[
    ResponseI<CommerceDataByClientI & { totals: TotalsCommerceDataByClientI }>,
    ResponseI<RefillsByPaymentMethod> | undefined,
    ResponseI<AnalysisByParcelI> | undefined,
    ResponseI<{ totalShipments: number }> | undefined,
    ResponseI<{ income: string }> | undefined,
    ResponseI<{ margin: string, margin_percentage: string }> | undefined,
    ResponseI<{ total_active_balance: string }> | undefined
]> {
    try {
        let response = null;
        if (requestOnLyAnalysisByClient) {
            response = await getAnalysisByClient(initDate, endDate, page, pageSize, search);
            return [response, undefined, undefined, undefined, undefined, undefined, undefined];
        } else {
            response = await Promise.all([
                getAnalysisByClient(initDate, endDate, page, pageSize, search),
                getRefillsByPaymentMethod(initDate, endDate),
                getAnalysisByParcels(initDate, endDate),
                getTotalShippings(initDate, endDate),
                getTotalIncomes(initDate, endDate),
                getTotalMargin(initDate, endDate),
                getTotalBalance(initDate, endDate)
            ]);
            return response;
        }
    } catch (error) {
        throw new Error(`error: ${error}`);
    }
}