import { TerrorSource } from "./error"


export type Return = {
    statusCode: number,
    message: string,
    errorSource: TerrorSource
}