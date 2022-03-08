import { stripHtml } from "string-strip-html"
import {
    WixProductChoice,
    WixProductOption,
    WixProductProperties,
    WixVariant,
} from "../../types/product"
import {
    ConvertedProductInterface,
    ProductConverterStrategyInterface,
} from "./ProductConverterInterface"

interface VariantOverridesInterface {
    pid: string
    title: string
    description?: string
    link?: string
    imageLink?: string
    additionalImageLink?: string
    price?: string
    salePrice?: string
    availability?: Boolean
    inventory?: number
    brand?: string
    mpn?: string
    itemGroupId?: string
    size?: string
    color?: string
    additionalVariantAttributes?: string
}

interface AdditionalVariantAttributesInterface {
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

interface VariantDataInterface {
    size?: string
    color?: string
    additionalVariantAttributes?: string
}

export class ProductConverterVarientStrategy
    implements ProductConverterStrategyInterface
{
    convertProduct(product: WixProductProperties): ConvertedProductInterface[] {
        return product.variants.map((variant) => {
            return this.convertVariant(variant, product)
        })
    }

    convertVariant(
        variant: WixVariant,
        product: WixProductProperties
    ): ConvertedProductInterface {
        const choiceValues = Object.values(variant.choices)

        const matchingOption = this.getVariantMatchingOption(
            variant,
            product.productOptions
        )

        const matchingChoice = this.getVariantMatchingChoice(
            variant,
            product.productOptions
        )

        const availability = matchingChoice
            ? matchingChoice.inStock
            : product.stock.inStock

        const variantOverrides: VariantOverridesInterface = {
            pid: variant.id,
            title: `${product.name} ${choiceValues.join(" ")}`,
            price:
                variant.variant.priceData.price +
                " " +
                variant.variant.priceData.currency,
            salePrice:
                variant.variant.priceData.discountedPrice +
                " " +
                variant.variant.priceData.currency,
            availability: availability || false,
            itemGroupId: `${this.kebabToSnake(
                product.slug
            )}_${matchingOption.name.toLocaleLowerCase()}`,
        }

        const imageLink =
            matchingChoice && matchingChoice.media
                ? matchingChoice.media.mainMedia?.image.url
                : product.media.mainMedia.image.url

        if (imageLink) {
            variantOverrides.imageLink = imageLink
        }

        const additionalImageLink =
            matchingChoice &&
            matchingChoice.media?.items.length > 1 &&
            matchingChoice.media?.items[1].id !==
                matchingChoice.media?.mainMedia.id
                ? matchingChoice.media.items[1].image.url
                : null

        if (additionalImageLink) {
            variantOverrides.additionalImageLink = additionalImageLink
        }

        const variantData = this.getVariantData(
            matchingOption.name.toLocaleLowerCase(),
            matchingChoice?.description || matchingChoice?.value
        )

        return {
            ...this.getDefaults(product),
            ...variantOverrides,
            ...variantData,
        }
    }

    kebabToSnake(kebab: string): string {
        return kebab.replace(/-/g, "_")
    }

    getVariantData(optionName: string, choiceValue: string): VariantDataInterface {
        const varientOptions = [
            "size",
            "color",
            "design",
            "metal",
            "scent",
            "style",
            "flavor",
            "card",
            "tvShow",
            "saying",
            "scentSelection",
            "skinType",
        ]

        const variantData: VariantDataInterface = {}

        varientOptions.forEach((option) => {
            if (option !== optionName) {
                return
            }

            if (option === "size" || option === "color") {
                variantData[option] = choiceValue
            } else {
                variantData.additionalVariantAttributes = JSON.stringify({[option]: choiceValue})
            }
        })

        return variantData
    }

    getVariantMatchingOption(
        variant: WixVariant,
        productOptions: WixProductOption[]
    ): WixProductOption {
        return (
            productOptions.find((option) =>
                variant.choices.hasOwnProperty(option.name)
            ) || null
        )
    }

    getVariantMatchingChoice(
        variant: WixVariant,
        productOptions: WixProductOption[]
    ): WixProductChoice {
        const matchingOption = productOptions.find((option) =>
            variant.choices.hasOwnProperty(option.name)
        )

        if (!matchingOption || matchingOption.choices.length === 0) {
            return null
        }

        return matchingOption.choices.find(
            (choice) =>
                variant.choices[matchingOption.name] === choice.value ||
                variant.choices[matchingOption.name] === choice.description
        )
    }

    getDefaults(product: WixProductProperties): ConvertedProductInterface {
        const strippedDescription = stripHtml(product.description)

        const additionalImageLink =
            product.media.items[0].id === product.media.mainMedia.id
                ? product.media.items[1]?.image.url
                : product.media.items[0].image.url

        const convertedProduct = {
            pid: product.id,
            title: product.name,
            description:
                strippedDescription.result ||
                product.productPageUrl.base.replace(/\/$/, "") +
                    product.productPageUrl.path,
            link:
                product.productPageUrl.base.replace(/\/$/, "") +
                product.productPageUrl.path,
            additionalImageLink: additionalImageLink,
            imageLink: product.media.mainMedia.image.url,
            price: product.priceData.price + " " + product.priceData.currency,
            salePrice: product.priceData.discountedPrice
                ? product.priceData.discountedPrice +
                  " " +
                  product.priceData.currency
                : null,
            availability: product.stock.inStock || false,
            inventory: product.stock.quantity,
            mpn: product.numericId,
            brand: product.brand,
        }

        return convertedProduct
    }
}
