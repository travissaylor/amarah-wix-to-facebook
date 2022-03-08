import { WixProductProperties } from "../../types/product"

export interface ConvertedProductInterface {
    pid: string
    title: string
    description: string
    link: string
    imageLink: string
    additionalImageLink?: string
    price: string
    salePrice?: string
    availability: Boolean
    inventory: number
    brand?: string
    mpn: string
    itemGroupId?: string
    size?: string
    color?: string
    additionalVariantAttributes?: string
}

export interface ProductConverterStrategyInterface {
    convertProduct(product: WixProductProperties): ConvertedProductInterface[]
}
