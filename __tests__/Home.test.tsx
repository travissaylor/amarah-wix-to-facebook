import { expect, test } from "vitest"
import { render, screen, waitFor } from "@testing-library/react"
import Home from "../pages"
import { SessionProvider } from "next-auth/react"
import { ChakraProvider } from "@chakra-ui/react"

test("Connect button renders", async () => {
    render(
        <SessionProvider session={null}>
            <ChakraProvider>
                <Home access_token={null} refresh_token={null} />
            </ChakraProvider>
        </SessionProvider>
    )

    expect(screen.getByRole("button"))
})
