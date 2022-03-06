import { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"
import prisma from "../../lib/prisma"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await getSession({ req })
    if (!session) {
        return res.status(401).end()
    }

    const { skip = "0", take = "10" } = req.query

    if (typeof skip !== "string" || typeof take !== "string") {
        return res.status(500).end()
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
        console.error(error)
        return res.status(500).end()
    }
}
