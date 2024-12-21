import React, { ReactNode } from "react";
import { PathsElementsI } from "./paths";


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