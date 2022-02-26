import { WixProductChoice, WixProductProperties } from "../../types/product"
import {
    ConvertedProductInterface,
    ProductConverterStrategyInterface,
} from "./ProductConverterInterface"

export class ProductConverterSingleStrategy
    implements ProductConverterStrategyInterface
{
    convertProduct(product: WixProductProperties): ConvertedProductInterface[] {
        const additionalImageLink =
            product.media.items[0].id === product.media.mainMedia.id
                ? product.media.items[1]?.image.url
                : product.media.items[0].image.url

        return [
            {
                pid: product.id,
                title: product.name,
                description: product.description,
                link:
                    product.productPageUrl.base.replace(/\/$/, "") +
                    product.productPageUrl.path,
                imageLink: product.media.mainMedia.image.url,
                additionalImageLink: additionalImageLink || null,
                price:
                    product.priceData.price + " " + product.priceData.currency,
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
            },
        ]
    }
}
