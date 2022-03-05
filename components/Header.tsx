import { ReactNode } from "react"
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
    useDisclosure,
    useColorModeValue,
    Stack,
    useColorMode,
    Center,
    Spinner,
} from "@chakra-ui/react"
import { MoonIcon, SunIcon } from "@chakra-ui/icons"
import { useSession } from "next-auth/react"
import NextLink from "next/link"

const NavLink = ({ children }: { children: ReactNode }) => (
    <Link
        px={2}
        py={1}
        rounded={"md"}
        _hover={{
            textDecoration: "none",
            bg: useColorModeValue("gray.200", "gray.700"),
        }}
        href={"#"}
    >
        {children}
    </Link>
)

export default function Nav() {
    const { colorMode, toggleColorMode } = useColorMode()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { data: session, status } = useSession()
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
                                        <MenuItem>
                                            <a href={`/api/auth/signout`}>
                                                Logout
                                            </a>
                                        </MenuItem>
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
