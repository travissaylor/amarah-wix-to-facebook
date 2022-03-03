import { Products } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"
import { Product } from "../../dynamodb/models"
import prisma from "../../lib/prisma"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { skip = "0", take = "10" } = req.query

    if (typeof skip !== "string" || typeof take !== "string") {
        res.status(500).end()
        return
    }

    const skipInt = parseInt(skip)
    const takeInt = parseInt(take)

    try {
        const queryRes = await prisma.products.findMany({
            skip: skipInt,
            take: takeInt,
        })

        res.status(200).json(queryRes)
    } catch (error) {
        res.status(500).end()
        console.error(error)
        return
    }
}
