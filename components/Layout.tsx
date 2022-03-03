import Header from "./Header"
import type { ReactChildren } from "react"
import Head from "next/head"
import { useSession } from "next-auth/react"
import { Center, Link, Spinner } from "@chakra-ui/react"
import ErrorDiagnosis from "./ErrorDiagnosis"

interface Props {
    children: React.ReactNode
}

export default function Layout({ children }: Props) {
    const { data: session, status } = useSession()
    return (
        <>
            <Head>
                <title>Amarah Wix to Facebook</title>
                <meta
                    name="description"
                    content="App to help get Wix store data to Facebook"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <main>
                {status === "authenticated" ? (
                    children
                ) : status === "loading" ? (
                    <Center height={"90vh"}>
                        <Spinner />
                    </Center>
                ) : (
                    <ErrorDiagnosis
                        code={401}
                        title="You Must Login to Access The Site"
                        description="To use anything on the site, you must be logged in. Click the button below or use the navbar link."
                        linkText="Login"
                        linkHref="/api/auth/signin"
                    />
                )}
            </main>
        </>
    )
}
