import { NextApiRequest, NextApiResponse } from "next"
import * as csvjson from "csvjson"
import prisma from "../../lib/prisma"
import { getSession } from "next-auth/react"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await getSession({ req })
    if (!session) {
        return res.status(401).end()
    }

    const products = await prisma.products.findMany()

    const csvData = csvjson.toCSV(products, { headers: "key" })

    try {
        const filename = `${Date.now()}-products-with-variants.csv`

        res.setHeader("Content-Type", "text/csv")
        res.setHeader("Content-Disposition", `attachment; filename="${filename}"`)
        return res.status(200).send(csvData)
    } catch (error) {
        return res.status(error.statusCode).json(error)
    }
}
