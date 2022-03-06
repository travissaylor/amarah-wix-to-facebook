export interface WixProductProperties {
    id: string
    name: string
    slug: string
    visible: boolean
    productType: string
    description: string
    sku: string
    weight: number
    stock: WixStock
    price: WixPrice
    priceData: WixPrice
    convertedPriceData: WixPrice
    pricePerUnitData: WixPricePerUnitData
    ribbons: Array<string>
    additionalInfoSections: Array<WixAdditionalInfo>
    media: {
        mainMedia: WixMedia
        items: Array<WixMedia>
    }
    customTextFields: Array<WixCustomText>
    manageVariants: boolean
    productOptions: Array<WixProductOption>
    productPageUrl: {
        base: string
        path: string
    }
    numericId: string
    inventoryItemId: string
    discount: {
        type: "UNDEFINED" | "NONE" | "AMOUNT" | "PERCENT"
        value: number
    }
    collectionIds: Array<string>
    variants: Array<WixVariant>
    lastUpdated: string
    seoData: {
        tags: Array<WixSeoTag>
    }
    ribbon: string
    brand: string
}

export interface WixStock {
    trackInventory: boolean
    quantity: number
    inStock: boolean
}

export interface WixPrice {
    currency: string
    price: number
    discountedPrice: number
    pricePerUnit: number
    formatted: {
        price: string
        discountedPrice: string
        pricePerUnit: string
    }
}

export interface WixPricePerUnitData {
    totalQuantity: number
    totalMeasurementUnit:
        | "UNSPECIFIED"
        | "ML"
        | "CL"
        | "L"
        | "CBM"
        | "MG"
        | "G"
        | "KG"
        | "MM"
        | "CM"
        | "M"
        | "SQM"
        | "OZ"
        | "LB"
        | "FLOZ"
        | "PT"
        | "QT"
        | "GAL"
        | "IN"
        | "FT"
        | "YD"
        | "SQFT"
    baseQuantity: number
    baseMeasurementUnit:
        | "UNSPECIFIED"
        | "ML"
        | "CL"
        | "L"
        | "CBM"
        | "MG"
        | "G"
        | "KG"
        | "MM"
        | "CM"
        | "M"
        | "SQM"
        | "OZ"
        | "LB"
        | "FLOZ"
        | "PT"
        | "QT"
        | "GAL"
        | "IN"
        | "FT"
        | "YD"
        | "SQFT"
}

export interface WixAdditionalInfo {
    title: string
    description: string
}

export interface WixMedia {
    thumbnail: {
        url: string
        width: number
        height: number
    }
    mediaType:
        | "unspecified_media_item_type"
        | "image"
        | "video"
        | "audio"
        | "document"
        | "zip"
    title: string
    image?: WixMediaFile
    video?: {
        files: Array<WixMediaFile>
        stillFrameMediaId: string
    }
    id: string
}

export interface WixMediaFile {
    url: string
    width: number
    height: number
}

export interface WixCustomText {
    title: string
    maxLength: number
    mandatory: boolean
}

export interface WixProductOption {
    optionType: string
    name: string
    choices: WixProductChoice[]
}

export interface WixProductChoice {
    value: string
    description: string
    media: {
        mainMedia: WixMedia
        items: Array<WixMedia>
    }
    inStock: boolean
    visible: boolean
}
export interface WixVariant {
    id: string
    choices: object
    variant: WixVariantData
}

export interface WixVariantData {
    priceData: WixPrice
    convertedPriceData: WixPrice
    weight: number
    sku: string
    visible: boolean
}

export interface WixSeoTag {
    type: "title" | "meta" | "script" | "link"
    props: object
    meta: object
    children: string
    custom: boolean
    disabled: boolean
}
