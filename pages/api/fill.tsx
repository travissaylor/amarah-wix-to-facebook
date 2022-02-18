import prisma from "../../lib/prisma"

export default async function handler(req, res) {
    const keys = await prisma.wix.findFirst()
    if (!keys || !keys.access_token || !keys.refresh_token) {
        res.status(500).end()
        return
    }
    console.log({ keys })
    res.status(200).json({ name: "John Doe" })
}
