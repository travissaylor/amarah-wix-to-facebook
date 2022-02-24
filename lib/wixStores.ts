import FetchError from "../exceptions/FetchError"
import { WixProductProperties } from "../types/product"
import prisma from "./prisma"

const API_BASE_URL = "https://www.wixapis.com/stores/v1"

const wixUrl = (path: string) => `${API_BASE_URL}${path}`
const wixAuthHeader = (token: string) => `Bearer ${token}`

export const refreshAccessToken = async (refreshToken: string) => {
    const appId = process.env.NEXT_PUBLIC_WIX_APP_ID
    const appSecret = process.env.WIX_APP_SECRET_KEY

    const res = await fetch("https://www.wix.com/oauth/access", {
        method: "POST",
        headers: new Headers({
            "Content-Type": "application/json",
        }),
        body: JSON.stringify({
            grant_type: "refresh_token",
            client_id: appId,
            client_secret: appSecret,
            refresh_token: refreshToken,
        }),
    })

    if (!res.ok) {
        throw new FetchError(res.statusText, res)
    }

    const keys = await res.json()

    await upsertKeys(keys.access_token, keys.refresh_token)

    return keys
}

export const getProducts = async (
    accessToken: string
): Promise<WixProductProperties> => {
    const productQueryRes = await fetch(wixUrl("/products/query"), {
        method: "POST",
        headers: new Headers({
            "content-type": "application/json",
            Authorization: wixAuthHeader(accessToken),
        }),
        body: JSON.stringify({
            includeVariants: true,
        }),
    })

    if (!productQueryRes.ok) {
        throw new FetchError(productQueryRes.statusText, productQueryRes)
    }

    const { products } = await productQueryRes.json()

    return products
}

export const upsertKeys = async (
    access_token: string,
    refresh_token: string
) => {
    return await prisma.wix.upsert({
        where: {
            id: 1,
        },
        update: {
            access_token: access_token,
            refresh_token: refresh_token,
        },
        create: {
            id: 1,
            access_token: access_token,
            refresh_token: refresh_token,
        },
    })
}
