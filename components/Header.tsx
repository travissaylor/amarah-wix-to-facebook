import {
    Box,
    Flex,
    Avatar,
    Link,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useColorModeValue,
    Stack,
    useColorMode,
    Center,
    Spinner,
    HStack,
} from "@chakra-ui/react"
import { MoonIcon, SunIcon } from "@chakra-ui/icons"
import { useSession } from "next-auth/react"
import NextLink from "next/link"

const Links = [{ text: "Products", link: "/products" }]

export default function Nav() {
    const { data: session, status } = useSession()
    const { colorMode, toggleColorMode } = useColorMode()
    const loading = status === "loading"

    return (
        <>
            <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
                <Flex
                    h={16}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                >
                    <Box>
                        <NextLink href="/">
                            <Link fontSize="lg">Amarah</Link>
                        </NextLink>
                    </Box>

                    {status === "authenticated" && (
                        <HStack
                            as={"nav"}
                            spacing={4}
                            display={{ base: "none", md: "flex" }}
                        >
                            {Links.map((link) => (
                                <NextLink key={link.text} href={link.link}>
                                    <Link
                                        px={2}
                                        py={1}
                                        rounded={"md"}
                                        _hover={{
                                            textDecoration: "none",
                                            bg: useColorModeValue(
                                                "gray.200",
                                                "gray.700"
                                            ),
                                        }}
                                        as={"span"}
                                    >
                                        {link.text}
                                    </Link>
                                </NextLink>
                            ))}
                        </HStack>
                    )}

                    <Flex alignItems={"center"}>
                        <Stack direction={"row"} spacing={7}>
                            <Button onClick={toggleColorMode}>
                                {colorMode === "light" ? (
                                    <MoonIcon />
                                ) : (
                                    <SunIcon />
                                )}
                            </Button>
                            {session?.user ? (
                                <Menu>
                                    <MenuButton
                                        as={Button}
                                        rounded={"full"}
                                        variant={"link"}
                                        cursor={"pointer"}
                                        minW={0}
                                    >
                                        {session.user.image && (
                                            <Avatar
                                                size={"sm"}
                                                src={session.user.image}
                                            />
                                        )}
                                    </MenuButton>
                                    <MenuList alignItems={"center"}>
                                        <br />
                                        <Center>
                                            <Avatar
                                                size={"2xl"}
                                                src={session.user.image}
                                            />
                                        </Center>
                                        <br />
                                        <Center>
                                            <p>{session.user.name}</p>
                                        </Center>
                                        <br />
                                        <MenuDivider />
                                        <MenuItem>Account Settings</MenuItem>
                                        <a href={`/api/auth/signout`}>
                                            <MenuItem>Logout</MenuItem>
                                        </a>
                                    </MenuList>
                                </Menu>
                            ) : loading ? (
                                <Center>
                                    <Spinner />
                                </Center>
                            ) : (
                                <Center>
                                    <a href={`/api/auth/signin`}>Login</a>
                                </Center>
                            )}
                        </Stack>
                    </Flex>
                </Flex>
            </Box>
        </>
    )
}
