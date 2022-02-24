import { FetchEventResult } from "next/dist/server/web/types"

export default class FetchError extends Error {
    __proto__ = Error
    response: Response

    constructor(message: string, response?: Response) {
        super(message)
        Object.setPrototypeOf(this, FetchError.prototype)
        this.response = response
    }
}
