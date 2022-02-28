import * as dynamoose from "dynamoose"
import { NextAuthSchema, ProductSchema, WixTokensSchema } from "./schema"

export const WixTokens = dynamoose.model("wix-tokens", WixTokensSchema, {
    create: true,
    prefix: process.env.NODE_ENV + "-"
})

export const Product = dynamoose.model("products", ProductSchema, {
    create: true,
    prefix: process.env.NODE_ENV + "-"
})

export const NextAuthModel = dynamoose.model("next-auth", NextAuthSchema, {
    create: true,
    prefix: process.env.NODE_ENV + "-"
})