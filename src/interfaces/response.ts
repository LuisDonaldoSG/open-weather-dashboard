export interface ResponseI<I, E = undefined> {
    success: boolean,
    statusCode: number
    message: string
    body: I
    detail?: E
    data?: I
}