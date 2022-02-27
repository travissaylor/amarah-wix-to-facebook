import * as dynamoose from "dynamoose"

export const ProductSchema = new dynamoose.Schema(
    {
        pid: String,
        title: String,
        description: String,
        link: String,
        imageLink: String,
        additionalImageLink: { type: String, required: false },
        price: String,
        salePrice: { type: String, required: false },
        salePriceEffectiveDate: { type: String, required: false },
        availability: Boolean,
        inventory: { type: Number, required: false },
        brand: { type: String, required: false },
        mpn: String,
        itemGroupId: { type: String, required: false },
        VariantOptions: {
            type: Object,
            schema: {
                size: { type: String, required: false },
                color: { type: String, required: false },
                design: { type: String, required: false },
                metal: { type: String, required: false },
                scent: { type: String, required: false },
                style: { type: String, required: false },
                flavor: { type: String, required: false },
                card: { type: String, required: false },
                tvShow: { type: String, required: false },
                saying: { type: String, required: false },
                scentSelection: { type: String, required: false },
                skinType: { type: String, required: false },
            },
            required: false,
        },
    },
    {
        saveUnknown: false,
        timestamps: true,
    }
)

export const WixTokensSchema = new dynamoose.Schema(
    {
        id: Number,
        access_token: String,
        refresh_token: String,
    },
    {
        saveUnknown: false,
        timestamps: true,
    }
)
