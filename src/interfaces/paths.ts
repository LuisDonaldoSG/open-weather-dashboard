export interface PathDataI {
    alias: string
    route: string
}

export interface PathsElementsI {
    pathData: PathDataI | PathDataI[]
}