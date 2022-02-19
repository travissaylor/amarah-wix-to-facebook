import Header from "./Header"
import type { ReactChildren } from "react"
import Head from "next/head"
import { useSession } from "next-auth/react"
import { Center, Link } from "@chakra-ui/react"
import ErrorDiagnosis from "./ErrorDiagnosis"

interface Props {
    children: React.ReactNode
}

export default function PublicLayout({ children }: Props) {
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
            <main>{children}</main>
        </>
    )
}
