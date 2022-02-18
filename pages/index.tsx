import { GetServerSideProps } from "next"
import Head from "next/head"
import Image from "next/image"
import { useEffect, useState } from "react"
import Connect from "../components/Connect"
import Layout from "../components/Layout"
import Success from "../components/Success"
import prisma from "../lib/prisma"

export default function Home({ access_token, refresh_token }) {
    if (access_token && refresh_token) {
        return (
            <Layout>
                <Success />
            </Layout>
        )
    }

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

    console.log({ loading })

    return (
        <Layout>
            <Connect
                link={link.toString()}
                loading={loading}
                onClick={(e) => setLoading(true)}
            />
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const keys = await prisma.wix.findFirst()
    console.log("keys: ", keys)

    return {
        props: {
            access_token: keys?.access_token || null,
            refresh_token: keys?.refresh_token || null,
        }, // will be passed to the page component as props
    }
}
