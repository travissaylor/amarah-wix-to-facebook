import { WixProductProperties } from "../../types/product"

export interface ConvertedProductInterface {
    id: string
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
    size?: string
    color?: string
}

export interface ProductConverterStrategyInterface {
    convertProduct(product: WixProductProperties): ConvertedProductInterface[]
}
