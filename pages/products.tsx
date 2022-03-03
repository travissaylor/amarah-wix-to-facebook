import { GetServerSideProps } from "next"
import { useEffect, useState } from "react"
import Layout from "../components/Layout"
import ProductTable from "../components/ProductTable"
import { Product } from "../dynamodb/models"

export default function Products() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [lastKey, setLastKey] = useState()

    const fetchProducts = async (
        start: object | null = null,
        limit: number = 20
    ) => {
        if (!start) {
            return await Product.query().limit(limit).exec()
        }

        return await Product.query().startAt(start).limit(limit).exec()
    }

    // useEffect(() => {
    //     const getInitialProducts = async () => {
    //         const queryResponse = await fetchProducts()
    //         console.log({ queryResponse })
    //     }

    //     getInitialProducts()
    // })
    const header = []
    const data = []
    return (
        <Layout>
            <h1>Products</h1>
            <ProductTable header={header} data={data} />
        </Layout>
    )
}
