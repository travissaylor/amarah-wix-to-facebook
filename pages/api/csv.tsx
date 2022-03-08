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
    additional_variant_attribute: string
    quantity_to_sell_on_facebook: number
    google_product_category: string
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
    return products.map((product) => {
        const additionalVariantAttributesObject =
            product.additionalVariantAttributes &&
            typeof product.additionalVariantAttributes === "string"
                ? JSON.parse(product.additionalVariantAttributes)
                : {}

        let additionalVariantAttributes = ""
        Object.keys(additionalVariantAttributesObject).forEach(
            (variantObjectKey, index) => {
                additionalVariantAttributes += `${variantObjectKey}:${
                    additionalVariantAttributesObject[variantObjectKey]
                }${
                    index !== additionalVariantAttributesObject.length - 1
                        ? ","
                        : ""
                }`
            }
        )
        return {
            id: product.pid,
            title: product.title,
            description: product.description,
            link: product.link,
            image_link: product.imageLink,
            additional_image_link: product.additionalImageLink,
            price: product.price,
            availability: product.availability ? "in stock" : "out of stock",
            inventory: product.inventory ?? 0,
            item_group_id: product.itemGroupId || "",
            sale_price: product.salePrice || "",
            sale_price_effective_date: "",
            brand: product.brand || "",
            mpn: product.mpn || "",
            size: product.size || "",
            color: product.color || "",
            additional_variant_attribute: additionalVariantAttributes,
            quantity_to_sell_on_facebook: product.inventory ?? 0,
            google_product_category: ""
        }
    })
}
