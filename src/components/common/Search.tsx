'use client'

import { useActionState, useEffect, useState } from "react";
import { findCities } from "actions/home";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams, } from "next/navigation";

export default function Search() {

    const [state, formAction, pending] = useActionState(findCities, { cnt: 0, list: [] });
    const [selectValue, setSelectValue] = useState<string>('');
    const [inputValueSearch, setInputValueSearch] = useState<string>('');
    const [inputValueOperator, setInputValueOperator] = useState<string>('');
    const iconsUrl = process.env.NEXT_PUBLIC_OPEN_WEATHER_ICONS_URL
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const params = new URLSearchParams(searchParams);
    const [openList, setOpenList] = useState<boolean>(false);

    useEffect(() => {
        if (state.list.length > 0) {
            setOpenList(true);
        } else {
            setOpenList(false);
        }
    }, [state])

    const handleChangeCity = (cityId: number) => {
        params.set('cityId', cityId.toString());
        setInputValueSearch('');
        setOpenList(false);
        setInputValueOperator('');
        setSelectValue('');
        replace(`${pathname}?${params.toString()}`)
    }

    return (
        <form className='flex items-center justify-center py-2 gap-4 flex-col lg:flex-row relative' action={formAction}>
            <input
                type='text'
                placeholder='Search'
                value={inputValueSearch}
                onChange={event => setInputValueSearch(event.target.value)}
                name="cityName"
                className='p-2 border border-gray-200 rounded-lg w-full'
            />
            <span>Temperature</span>
            <select
                name="operator"
                className='p-2 border border-gray-200 rounded-lg lg:w-auto w-full'
                value={selectValue}
                onChange={event => setSelectValue(event.target.value)}
            >
                <option value='' disabled>Select</option>
                <option value='='>Equal to</option>
                <option value='>'>Greater than</option>
                <option value='<'>Less than</option>
            </select>
            <input
                type='number'
                value={inputValueOperator}
                onChange={event => setInputValueOperator(event.target.value)}
                disabled={!selectValue}
                name="valueOperator"
                className='p-2 border border-gray-200 rounded-lg lg:w-20 w-full'
            />
            <button
                type='submit'
                disabled={pending || (!inputValueSearch && !selectValue)}
                className='bg-indigo-500 text-white p-2 rounded-lg ml-2 lg:w-auto w-full disabled:opacity-50'>
                {
                    pending ? 'Loading...' : 'Search'
                }
            </button>
            {
                openList && <div className="absolute right-0 top-12 flex flex-col justify-center gap-2 p-2 bg-white shadow rounded-lg w-80">
                    {
                        state.list.map((city, index) => (
                            <div
                                key={index}
                                className='flex items-center justify-between p-2 rounded-lg cursor-pointer bg-gray-100'
                                onClick={() => handleChangeCity(city.id)}
                            >
                                <span>{city.name}</span>
                                <div className="flex gap-2 items-center">
                                    <span>{city.main.temp.toFixed()} °F</span>
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
            }
        </form>
    );
}