import { WixProductProperties } from "../../types/product"

export interface ConvertedProductInterface {
    pid: string
    title: String
    description: String
    link: String
    imageLink: String
    additionalImageLink?: String
    price: string
    salePrice?: string
    salePriceEffectiveDate?: Date
    availability: Boolean
    inventory: number
    brand?: String
    mpn: string
    itemGroupId?: string
    VariantOptions?: {
        size?: string
        color?: string
        design?: string
        metal?: string
        scent?: string
        style?: string
        flavor?: string
        card?: string
        tvShow?: string
        saying?: string
        scentSelection?: string
        skinType?: string
    }
    size?: string
    color?: string
}

export interface ProductConverterStrategyInterface {
    convertProduct(product: WixProductProperties): ConvertedProductInterface[]
}
