import { stripHtml } from "string-strip-html"
import { WixProductChoice, WixProductProperties } from "../../types/product"
import {
    ConvertedProductInterface,
    ProductConverterStrategyInterface,
} from "./ProductConverterInterface"

export class ProductConverterSingleStrategy
    implements ProductConverterStrategyInterface
{
    convertProduct(product: WixProductProperties): ConvertedProductInterface[] {
        const strippedDescription = stripHtml(product.description)

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

        return [convertedProduct]
    }
}
