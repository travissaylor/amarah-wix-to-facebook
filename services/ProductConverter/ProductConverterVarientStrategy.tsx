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

        const imageLink =
            matchingChoice && matchingChoice.media
                ? matchingChoice.media.mainMedia?.image.url
                : product.media.mainMedia.image.url

        const additionalImageLink =
            matchingChoice &&
            matchingChoice.media?.items.length > 1 &&
            matchingChoice.media?.items[1].id !==
                matchingChoice.media?.mainMedia.id
                ? matchingChoice.media.items[1].image.url
                : null

        const availability = matchingChoice
            ? matchingChoice.inStock
            : product.stock.inStock

        const variantOverrides = {
            pid: variant.id,
            title: `${product.name} ${choiceValues.join(" ")}`,
            imageLink: imageLink || product.media.mainMedia.image.url,
            additionalImageLink: additionalImageLink,
            price:
                variant.variant.priceData.price +
                " " +
                variant.variant.priceData.currency,
            salePrice:
                variant.variant.priceData.discountedPrice +
                " " +
                variant.variant.priceData.currency,
            availability: availability || false,
            // VariantOptions: {
            //     [matchingOption.name]: matchingChoice?.value || null
            // },
        }

        return {
            ...this.getDefaults(product),
            ...variantOverrides,
        }
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
            (choice) => variant.choices[matchingOption.name] === choice.value
        )
    }

    getDefaults(product: WixProductProperties): ConvertedProductInterface {
        const additionalImageLink =
            product.media.items[0].id === product.media.mainMedia.id
                ? product.media.items[1]?.image.url
                : product.media.items[0].image.url

        return {
            pid: product.id,
            title: product.name,
            description: product.description,
            link:
                product.productPageUrl.base.replace(/\/$/, "") +
                product.productPageUrl.path,
            imageLink: product.media.mainMedia.image.url,
            additionalImageLink: additionalImageLink || null,
            price: product.priceData.price + " " + product.priceData.currency,
            salePrice:
                product.priceData.discountedPrice +
                " " +
                product.priceData.currency,
            salePriceEffectiveDate: null,
            availability: product.stock.inStock || false,
            inventory: product.stock.quantity,
            brand: product.brand || null,
            mpn: product.numericId,
            itemGroupId: product.slug,
        }
    }
}
