import * as dynamoose from "dynamoose"
import { ProductSchema, VariantOptionsSchema, WixTokensSchema } from "./schema"

export const WixTokens = dynamoose.model("WixTokens", WixTokensSchema, {
    create: true,
})

export const Product = dynamoose.model("Product", ProductSchema, {
    create: true,
})

// export const VariantOptions = dynamoose.model(
//     "VariantOptions",
//     VariantOptionsSchema,
//     {
//         create: true,
//     }
// )
