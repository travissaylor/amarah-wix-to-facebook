import { WixProductProperties } from "../../types/product"
import { ProductConverterStrategyInterface } from "./ProductConverterInterface"
import { ProductConverterSingleStrategy } from "./ProductConverterSingleStrategy"
import { ProductConverterVarientStrategy } from "./ProductConverterVarientStrategy"

export default class ProductConverterFactory {
    getConverterStrategy(
        product: WixProductProperties
    ): ProductConverterStrategyInterface {
        if (product.variants.length > 1) {
            return new ProductConverterVarientStrategy()
        }

        return new ProductConverterSingleStrategy()
    }
}
