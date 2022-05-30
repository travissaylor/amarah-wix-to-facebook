import React from "react"
import {
    Flex,
    useColorModeValue,
    ButtonGroup,
    IconButton,
    Table,
    Thead,
    Tr,
    Th,
    Td,
    Tbody,
    Center,
    Text,
} from "@chakra-ui/react"
import Image from "next/image"

interface DataItem {
    name: string
    imageLink: string
    price: string
    inventory: number | null
}

interface TableProps {
    header: string[]
    data: DataItem[]
}

export default function ProductTable(props: TableProps) {
    const { header, data } = props
    const tableBackground = useColorModeValue("white", "gray.800")
    const tableItemTextColor = useColorModeValue("gray.400", "gray.400")
    return (
        <Flex
            w="full"
            bg="gray.600"
            my={{
                base: 5,
                md: 0,
            }}
            p={{
                base: 0,
                md: 50,
            }}
            alignItems="center"
            justifyContent="center"
        >
            <Table
                w="full"
                bg={tableBackground}
                variant="striped"
                display={{
                    base: "block",
                    md: "table",
                }}
                sx={{
                    "@media print": {
                        display: "table",
                    },
                }}
            >
                <Thead
                    display={{
                        base: "none",
                        md: "table-header-group",
                    }}
                    sx={{
                        "@media print": {
                            display: "table-header-group",
                        },
                    }}
                >
                    <Tr>
                        {header.map((x) => (
                            <Th key={x}>{x}</Th>
                        ))}
                    </Tr>
                </Thead>
                <Tbody
                    display={{
                        base: "block",
                        lg: "table-row-group",
                    }}
                    sx={{
                        "@media print": {
                            display: "table-row-group",
                        },
                    }}
                >
                    {data.map((token, tid) => {
                        return (
                            <Tr
                                key={tid}
                                display={{
                                    base: "grid",
                                    md: "table-row",
                                }}
                                sx={{
                                    "@media print": {
                                        display: "table-row",
                                    },
                                    gridTemplateColumns:
                                        "minmax(0px, 35%) minmax(0px, 65%)",
                                    gridGap: "10px",
                                }}
                            >
                                {Object.keys(token).map((x) => {
                                    console.log({ x })
                                    if (x === "imageLink") {
                                        return (
                                            <React.Fragment key={`${tid}${x}`}>
                                                <Td
                                                    display={{
                                                        base: "table-cell",
                                                        md: "none",
                                                    }}
                                                    sx={{
                                                        "@media print": {
                                                            display: "none",
                                                        },
                                                        textTransform:
                                                            "uppercase",
                                                        color: tableItemTextColor,
                                                        fontSize: "xs",
                                                        fontWeight: "bold",
                                                        letterSpacing: "wider",
                                                        fontFamily: "heading",
                                                    }}
                                                >
                                                    {x}
                                                </Td>
                                                <Td
                                                    color={"gray.500"}
                                                    fontSize="lg"
                                                    fontWeight="light"
                                                >
                                                    {token[x] &&
                                                    token[x] != "" ? (
                                                        <Image
                                                            src={token[x]}
                                                            width={200}
                                                            height={200}
                                                            objectFit="cover"
                                                        />
                                                    ) : (
                                                        <Center
                                                            w={{
                                                                base: 150,
                                                                md: 200,
                                                            }}
                                                            h={{
                                                                base: 150,
                                                                md: 200,
                                                            }}
                                                            bg={"gray.100"}
                                                        >
                                                            <Text>
                                                                No Image
                                                            </Text>
                                                        </Center>
                                                    )}
                                                </Td>
                                            </React.Fragment>
                                        )
                                    }
                                    return (
                                        <React.Fragment key={`${tid}${x}`}>
                                            <Td
                                                display={{
                                                    base: "table-cell",
                                                    md: "none",
                                                }}
                                                sx={{
                                                    "@media print": {
                                                        display: "none",
                                                    },
                                                    textTransform: "uppercase",
                                                    color: tableItemTextColor,
                                                    fontSize: "xs",
                                                    fontWeight: "bold",
                                                    letterSpacing: "wider",
                                                    fontFamily: "heading",
                                                }}
                                            >
                                                {x}
                                            </Td>
                                            <Td
                                                color={"gray.500"}
                                                fontSize="lg"
                                                fontWeight="light"
                                            >
                                                {token[x]}
                                            </Td>
                                        </React.Fragment>
                                    )
                                })}
                            </Tr>
                        )
                    })}
                </Tbody>
            </Table>
        </Flex>
    )
}
