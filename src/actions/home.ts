'use server';

import { ResponseListI } from "@interfaces/response";
import { WeatherByCityI } from "@interfaces/weather";

const baseUrl = process.env.OPEN_WEATHER_API_URL;
const appid = process.env.OPEN_WEATHER_APP_API_KEY;

const cityIds: string= [
    3530597,  
    3522307, 
    4005539,
    3996322,
    3522542,
    3998655,
    3514780,
    3526617,
    4017700,
    3533462,
    3531673,
    3520339
].join(',');

export async function getInfoByCities(cityId?: string): Promise<ResponseListI<WeatherByCityI[]>> {
    try {
        const urlToWithFilters = `${baseUrl}group?id=${cityId || cityIds}&appid=${appid}&units=imperial`;
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

export async function findCities(_currentState?: ResponseListI<WeatherByCityI[]>, formData?: FormData): Promise<ResponseListI<WeatherByCityI[]>> {
    try {
        console.log({formData});
        if (formData === undefined) {
            return {
                cnt: 0,
                list: []
            }
        }
        const cityName = formData.get('cityName') as string;
        const operator = formData.get('operator') as string;
        const valueOperator = formData.get('valueOperator') as string;
        console.log({cityName, operator, valueOperator});
        const urlToWithFilters = `${baseUrl}find?q=${cityName}&appid=${appid}&units=imperial`;
        console.log(`fetching: ${urlToWithFilters}`);
        const response = await fetch(urlToWithFilters);
        const data = await response.json() as ResponseListI<WeatherByCityI[]>;
        if (operator && valueOperator) {
            data.list = data.list.filter(city => {
                if (operator === '=') {
                    return Number(city.main.temp.toFixed()) === Number(valueOperator);
                }
                if (operator === '>') {
                    return Number(city.main.temp.toFixed()) > Number(valueOperator);
                }
                if (operator === '<') {
                    return Number(city.main.temp.toFixed()) < Number(valueOperator);
                }
                return false;
            });
        }
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
        throw new Error(`failed request`);
    }
}