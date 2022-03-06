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

        const variantOverrides = {
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
            variantOverrides.imageLink
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

    getVariantData(optionName: string, choiceValue: string) {
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

        const variantData = {}

        varientOptions.forEach((option) => {
            if (option === optionName) {
                variantData[option] = choiceValue
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

        const matchingChoice = matchingOption.choices.find(
            (choice) =>
                variant.choices[matchingOption.name] === choice.value ||
                variant.choices[matchingOption.name] === choice.description
        )

        return matchingChoice
    }

    getDefaults(product: WixProductProperties): ConvertedProductInterface {
        const convertedProduct = {
            pid: product.id,
            title: product.name,
            description: product.description,
            link:
                product.productPageUrl.base.replace(/\/$/, "") +
                product.productPageUrl.path,
            imageLink: product.media.mainMedia.image.url,
            price: product.priceData.price + " " + product.priceData.currency,
            availability: product.stock.inStock || false,
            inventory: product.stock.quantity,
            mpn: product.numericId,
        }

        const additionalImageLink =
            product.media.items[0].id === product.media.mainMedia.id
                ? product.media.items[1]?.image.url
                : product.media.items[0].image.url

        if (additionalImageLink) {
            convertedProduct.additionalImageLink = additionalImageLink
        }

        if (product.priceData.discountedPrice) {
            convertedProduct.salePrice =
                product.priceData.discountedPrice +
                " " +
                product.priceData.currency
        }
        if (product.brand) {
            convertedProduct.brand = product.brand
        }

        return convertedProduct
    }
}
