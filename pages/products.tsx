import {
    Button,
    Flex,
    Heading,
    Spinner,
    useColorModeValue,
} from "@chakra-ui/react"
import { GetServerSideProps } from "next"
import { useEffect, useState } from "react"
import Layout from "../components/Layout"
import ProductTable from "../components/ProductTable"
import FetchError from "../exceptions/FetchError"
import { ConvertedProductInterface } from "../services/ProductConverter/ProductConverterInterface"

export default function Products() {
    const [products, setProducts] = useState<ConvertedProductInterface[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const getInitialProducts = async () => {
            try {
                const queryResponse = await fetchProducts()
                setProducts(queryResponse)
                setLoading(false)
            } catch (error) {
                console.error(error.message)
            }
        }

        getInitialProducts()
    }, [])

    const fetchProducts = async (skip: number = 0, take: number = 20) => {
        const apiUrlString = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/api/products`
        const url = new URL(apiUrlString)
        url.searchParams.append("skip", skip.toString())
        url.searchParams.append("take", take.toString())
        const res = await fetch(url.toString())

        if (!res.ok) {
            throw new FetchError(res.statusText, res)
        }

        return await res.json()
    }

    const loadMore = async () => {
        try {
            setLoading(true)
            const queryResponse = await fetchProducts(products.length)
            setProducts((prevProducts) => [...prevProducts, ...queryResponse])
            setLoading(false)
        } catch (error) {
            console.error(error.message)
        }
    }

    return (
        <Layout>
            <Flex
                w="full"
                bg="gray.600"
                p={50}
                flexDir="column"
                alignItems="center"
                justifyContent="center"
            >
                <Heading color="white">Products</Heading>

                <ProductTable
                    header={["Name", "Image Link", "Price"]}
                    data={products.map((product) => ({
                        name: product.title,
                        imageLink: product.imageLink,
                        price: product.price,
                    }))}
                />
                <Button onClick={loadMore}>
                    {loading ? <Spinner /> : "Load More"}
                </Button>
            </Flex>
        </Layout>
    )
}
