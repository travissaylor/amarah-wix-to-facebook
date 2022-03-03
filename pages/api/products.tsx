import { NextApiRequest, NextApiResponse } from "next"
import { Product } from "../../dynamodb/models"

type ResponseData = {
    message: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    const { start = null, limit = null } = req.query

    console.log({ start, limit })
    try {
        const startDecoded =
            typeof start === "string" ? JSON.parse(start) : null
        const limitInt = typeof limit === "string" ? parseInt(limit) : null

        console.log({ limitInt, startDecoded })
        let products
        if (!startDecoded) {
            products = await fetchProducts(limitInt)
        } else {
            products = await fetchProducts(limitInt, startDecoded)
        }
        console.log({ products })

        res.status(200)
    } catch (error) {
        res.status(500).end()
        console.error(error)
        return
    }
}

const fetchProducts = async (
    limit: number = 20,
    start: object | null = null
) => {
    if (!start) {
        return await Product.query('pid').using('pid').all().exec()
    }

    return await Product.query().startAt(start).limit(limit).exec()
}
