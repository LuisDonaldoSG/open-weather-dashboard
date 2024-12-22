import React from "react";
import { PathsElementsI } from "@interfaces/paths";
import { ResponseListI } from "@interfaces/response";
import { WeatherByCityI } from "@interfaces/weather";


export interface LayoutI {
    children: React.ReactNode
}

export interface TitlePageI {
    title: string
}

export interface TopContentI {
    totalItems: number
}

export interface BottomContentI {
    pages: number
}

export interface LinkItemI {
    nameForSubPath?: string
    dataLink: PathsElementsI
}

export interface SideBarI {
    display?: string
}

export interface SelectableCitiesAndDetailsI {
    data: ResponseListI<WeatherByCityI[]>
}

export interface HomeI {
    cityId: string
}