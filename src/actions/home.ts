'use server';

import { ResponseListI } from "@interfaces/response";
import { WeatherByCityI } from "@interfaces/weather";

const baseUrl = process.env.OPEN_WEATHER_API_URL;
const appid = process.env.OPEN_WEATHER_APP_API_KEY;

export async function getInfoByCities(): Promise<ResponseListI<WeatherByCityI[]>> {
    try {
        const urlToWithFilters = `${baseUrl}group?id=2643743,3128760,2988507&appid=${appid}&units=metric`;
        console.log(`fetching: ${urlToWithFilters}`);
        const response = await fetch(urlToWithFilters);
        const data = await response.json() as ResponseListI<WeatherByCityI[]>;
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
        throw new Error(`failed request`);
    }
}