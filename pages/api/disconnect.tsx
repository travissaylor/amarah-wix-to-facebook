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

    try {
        const deleteWixKeys = await prisma.wix.delete({
            where: {
                id: 1,
            },
        })

        const deleteProducts = await prisma.products.deleteMany()

        res.status(200).json(deleteWixKeys)
    } catch (error) {
        console.error(error)
        return res.status(500).end()
    }
}
