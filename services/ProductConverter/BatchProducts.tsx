import { ConvertedProductInterface } from "./ProductConverterInterface";

export function BatchProducts(products: ConvertedProductInterface[], batchAmount: number = 20): ConvertedProductInterface[][] {
    let result = [];
    for (let i = 0; i < products.length; i += batchAmount) {
        let chunk = products.slice(i, i + batchAmount)
        result.push(chunk)
    }

    return result
}