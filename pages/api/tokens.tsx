import type { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"
import prisma from "../../lib/prisma"

type ResponseData = {
    message: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    const { code } = req.query

    const appId = process.env.NEXT_PUBLIC_WIX_APP_ID
    const appSecret = process.env.WIX_APP_SECRET_KEY

    const wixRes = await fetch("https://www.wix.com/oauth/access", {
        method: "POST",
        headers: new Headers({ "content-type": "application/json" }),
        body: JSON.stringify({
            grant_type: "authorization_code",
            client_id: appId,
            client_secret: appSecret,
            code: code,
        }),
    })

    if (!wixRes.ok) {
        console.log("oauth fetch failed: ", wixRes)
        res.redirect("/landing").end()
        return
    }

    const wixData = await wixRes.json()

    if (!wixData.access_token || !wixData.refresh_token) {
        console.log("wix data: ", wixData)
        res.redirect("/landing").end()
        return
    }

    // for now, only have one wix connection
    await prisma.wix.upsert({
        where: {
            id: 1,
        },
        update: {
            access_token: wixData.access_token,
            refresh_token: wixData.refresh_token,
        },
        create: {
            id: 1,
            access_token: wixData.access_token,
            refresh_token: wixData.refresh_token,
        },
    })

    const completeSetupRes = await fetch(
        "https://www.wixapis.com/apps/v1/bi-event",
        {
            method: "POST",
            headers: new Headers({
                "content-type": "application/json",
                Authorization: `bearer ${wixData.access_token}`,
            }),
            body: JSON.stringify({
                grant_type: "authorization_code",
                client_id: appId,
                client_secret: appSecret,
                code: code,
            }),
        }
    )

    if (!completeSetupRes.ok) {
        console.error("Setup could not be completed: ", completeSetupRes)
    }

    res.redirect("/landing")
}
