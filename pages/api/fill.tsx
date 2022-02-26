import prisma from "../../lib/prisma"
import { getProducts, refreshAccessToken } from "../../lib/wixStores"
import ProductConverterFactory from "../../services/ProductConverter/ProductConverterFactory"
import {
    WixProductChoice,
    WixProductProperties,
    WixVariant,
} from "../../types/product"

export default async function handler(req, res) {
    const keys = await prisma.wix.findFirst()
    if (!keys || !keys.access_token || !keys.refresh_token) {
        res.status(500).end()
        return
    }

    let products

    try {
        products = await getProducts(keys.access_token)
    } catch (error) {
        try {
            const { access_token } = await refreshAccessToken(
                keys.refresh_token
            )
            products = await getProducts(access_token)
        } catch (error) {
            const errorBody = await error.response.json()
            res.status(500).json(errorBody).end()
            return
        }
    }

    const mappedProducts = mapProductsToSchema(products)

    const update = await prisma.product.createMany({
        data: mappedProducts,
        skipDuplicates: true,
    })

    res.status(200).json({
        options: getAllProductOptions(products),
        choices: getAllVarientChoices(products),
        products: update,
    })
}

const mapProductsToSchema = (products: Array<WixProductProperties>) => {
    let productsWithVarients = []
    products.forEach((product) => {
        const ProductConverterFactoryInstance = new ProductConverterFactory()
        const ConverterStrategy =
            ProductConverterFactoryInstance.getConverterStrategy(product)

        const formattedVarients = ConverterStrategy.convertProduct(product)
        productsWithVarients = [...productsWithVarients, ...formattedVarients]
    })

    return productsWithVarients
}

const mapVariantOptions = (products: Array<WixProductProperties>) => {

}

const getAllVarientChoices = (products: WixProductProperties[]) => {
    const allChoices = {}
    products.forEach((product) => {
        product.variants.forEach((variant) => {
            Object.keys(variant.choices).forEach((choice) => {
                if (allChoices.hasOwnProperty(choice)) {
                    allChoices[choice] = allChoices[choice] + 1
                    return
                }
                allChoices[choice] = 1
            })
        })
    })

    return allChoices
}

const getAllProductOptions = (products: WixProductProperties[]) => {
    const productOptions = {}
    products.forEach((product) => {
        product.productOptions.forEach((option) => {
            if (productOptions.hasOwnProperty(option.name)) {
                productOptions[option.name] = productOptions[option.name] + 1
                return
            }
            productOptions[option.name] = 1
        })
    })
    return productOptions
}
