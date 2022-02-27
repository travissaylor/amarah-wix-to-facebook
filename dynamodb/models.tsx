import * as dynamoose from "dynamoose"
import { ProductSchema, WixTokensSchema } from "./schema"

export const WixTokens = dynamoose.model("WixTokens", WixTokensSchema, {
    create: true,
})

export const Product = dynamoose.model("Product", ProductSchema, {
    create: true,
})
