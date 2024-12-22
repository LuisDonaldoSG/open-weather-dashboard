'use client'

import { SelectableCitiesAndDetailsI } from "@interfaces/props"
import { WeatherByCityI } from "@interfaces/weather"
import { useMemo, useState } from "react"
import Image from "next/image"
import dayjs from "dayjs"

export default function SelectableCitiesAndDetails({ data }: SelectableCitiesAndDetailsI) {

    const [currentCity, setCurrentCity] = useState<number>(0)
    const cityInfo = useMemo<WeatherByCityI>(() => data.list[currentCity], [currentCity, data.list])
    const iconsUrl = process.env.NEXT_PUBLIC_OPEN_WEATHER_ICONS_URL

    return (
        <>
            <div className="flex flex-col gap-4 items-center">
                <article className="flex flex-col gap-2 items-center">
                    <span className="text-ms">{dayjs().format('MMM DD')}</span>
                    <span className="text-2xl font-semibold">{cityInfo.name}, {cityInfo.sys.country}</span>
                </article>
                <article className="flex gap-4">
                    <span className="text-4xl">{cityInfo.main.temp.toFixed()}°F</span>
                    <Image
                        src={`${iconsUrl}${cityInfo.weather[0].icon}.png`}
                        alt="weather-icon"
                        width={50}
                        height={50}
                    />
                </article>
                <span className="text-sm">Feels like {cityInfo.main.feels_like}°F. {cityInfo.weather[0].description}</span>
                <article className="flex flex-wrap gap-2 w-80 justify-center">
                    <span className="text-sm"><strong>Temp min:</strong> {cityInfo.main.temp_min.toFixed()} °F</span>
                    <span className="text-sm"><strong>Temp max:</strong> {cityInfo.main.temp_max.toFixed()} °F</span>
                    <span className="text-sm"><strong>Wind:</strong> {cityInfo.wind.speed} mph</span>
                    <span className="text-sm"><strong>Humidity:</strong> {cityInfo.main.humidity}%</span>
                </article>
            </div>
            <div className='flex flex-col gap-4 lg:w-96 w-full h-60 overflow-y-auto lg:px-2'>
                {
                    data.list.map((city, index) => (
                        <div
                            key={index}
                            data-selected={currentCity === index}
                            className={`flex items-center justify-between p-2 rounded-lg shadow bg-white cursor-pointer border-2 data-[selected=true]:border-l-indigo-500`}
                            onClick={() => setCurrentCity(index)}
                        >
                            <p>{city.name}</p>
                            <div className="flex gap-2 items-center">
                                <p>{city.main.temp.toFixed()}</p>
                                <Image
                                    src={`${iconsUrl}${city.weather[0].icon}.png`}
                                    alt="weather-icon"
                                    width={35}
                                    height={35}
                                />
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}