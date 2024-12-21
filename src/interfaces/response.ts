export interface ResponseListI<I, E = undefined> {
    list: I
    cnt: number
    code?: number
    message?: E
}