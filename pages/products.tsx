import { Button, Flex, Heading, Spinner } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import Layout from "../components/Layout"
import ProductTable from "../components/ProductTable"
import FetchError from "../exceptions/FetchError"
import { ConvertedProductInterface } from "../services/ProductConverter/ProductConverterInterface"

export default function Products() {
    const [products, setProducts] = useState<ConvertedProductInterface[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<boolean>(false)

    useEffect(() => {
        const getInitialProducts = async () => {
            try {
                const queryResponse = await fetchProducts()
                console.log(queryResponse)

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

    const runFill = async () => {
        setLoading(true)
        const apiUrlString = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/api/fill`
        const url = new URL(apiUrlString)
        const res = await fetch(url.toString())
        setLoading(false)
        if (!res.ok) {
            setError(true)
            console.error(res.statusText)
            setTimeout(() => {
                setError(false)
            }, 2000)
            return
        }

        location.reload()
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
                <Flex justifyContent="space-between" w="full" px={50}>
                    <Heading color="white">Products</Heading>
                    <Flex>
                        {error ? (
                            <Button
                                bg="red.300"
                                color="white"
                                mr={2}
                                onClick={runFill}
                            >
                                {loading ? <Spinner /> : "Run Fill"}
                            </Button>
                        ) : (
                            <Button
                                bg="white"
                                color="gray.600"
                                mr={2}
                                onClick={runFill}
                            >
                                {loading ? <Spinner /> : "Run Fill"}
                            </Button>
                        )}
                        <Button
                            bg="white"
                            color="gray.600"
                            as={"a"}
                            href="/api/csv"
                        >
                            Download CSV
                        </Button>
                    </Flex>
                </Flex>

                <ProductTable
                    header={["Name", "Image Link", "Price"]}
                    data={products.map((product) => ({
                        name: product.title,
                        imageLink: product.imageLink,
                        price: product.price,
                    }))}
                />
                <Button bg="white" color="gray.600" onClick={loadMore}>
                    {loading ? <Spinner /> : "Load More"}
                </Button>
            </Flex>
        </Layout>
    )
}
