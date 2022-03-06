import { NextApiRequest, NextApiResponse } from "next"
import * as csvjson from "csvjson"
import prisma from "../../lib/prisma"
import { Products } from "@prisma/client"

interface FaceBookFormatInterface {
    id: string
    title: string
    description: string
    link: string
    image_link: string
    additional_image_link: string
    price: string
    availability: "in stock" | "out of stock"
    inventory: number
    item_group_id: string
    sale_price: string
    sale_price_effective_date: string
    brand: string
    mpn: string
    size: string
    color: string
    saying: string
    design: string
    metal: string
    scent: string
    style: string
    flavor: string
    card: string
    tv_show: string
    scent_selection: string
    skin_type: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const products = await prisma.products.findMany()

    const facebookProducts = productsToFacebookFormat(products)

    const csvData = csvjson.toCSV(facebookProducts, { headers: "key" })

    try {
        const filename = `products-with-variants-${Date.now()}.csv`

        res.setHeader("Content-Type", "text/csv")
        res.setHeader(
            "Content-Disposition",
            `attachment; filename="${filename}"`
        )
        return res.status(200).send(csvData)
    } catch (error) {
        return res.status(error.statusCode).json(error)
    }
}

const productsToFacebookFormat = (
    products: Products[]
): FaceBookFormatInterface[] => {
    return products.map((product) => ({
        id: product.pid,
        title: product.title,
        description: product.description,
        link: product.link,
        image_link: product.imageLink,
        additional_image_link: product.additionalImageLink,
        price: product.price,
        availability: product.availability ? "in stock" : "out of stock",
        inventory: product.inventory,
        item_group_id: product.itemGroupId || "",
        sale_price: product.salePrice || "",
        sale_price_effective_date: "",
        brand: product.brand || "",
        mpn: product.mpn || "",
        size: product.size || "",
        color: product.color || "",
        saying: product.saying || "",
        design: product.design || "",
        metal: product.metal || "",
        scent: product.scent || "",
        style: product.style || "",
        flavor: product.flavor || "",
        card: product.card || "",
        tv_show: product.tvShow || "",
        scent_selection: product.scentSelection || "",
        skin_type: product.skinType || "",
    }))
}
