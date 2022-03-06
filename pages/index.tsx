import { GetServerSideProps } from "next"
import { useEffect, useState } from "react"
import Connect from "../components/Connect"
import Layout from "../components/Layout"
import prisma from "../lib/prisma"

export default function Home({ access_token, refresh_token }) {
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        if (loading) {
            setTimeout(() => {
                document.addEventListener("visibilitychange", function () {
                    setTimeout(async () => {
                        setLoading(false)
                        window.location.reload()
                    }, 300)
                })
            }, 1000)
        }
    }, [loading])
    const link = new URL("https://www.wix.com/installer/install")
    link.searchParams.append("appId", process.env.NEXT_PUBLIC_WIX_APP_ID)
    link.searchParams.append(
        "redirectUrl",
        process.env.NEXT_PUBLIC_WIX_APP_REDIRECT_URL
    )

    const disconnect = async () => {
        const apiUrlString = `${window?.location.protocol}//${window?.location.hostname}:${window?.location.port}/api/disconnect`
        const url = new URL(apiUrlString)
        const res = await fetch(url.toString())

        if (!res.ok) {
            console.error(res.statusText)
            return;
        }

        window.location.reload()
    }

    return (
        <Layout>
            <Connect
                link={link.toString()}
                connected={access_token && refresh_token}
                loading={loading}
                onClick={(e) => setLoading(true)}
                onDisconnect={disconnect}
            />
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const keys = await prisma.wix.findFirst()

    return {
        props: {
            access_token: keys?.access_token || null,
            refresh_token: keys?.refresh_token || null,
        }, // will be passed to the page component as props
    }
}
