import { GetServerSideProps } from "next"
import { useEffect, useState } from "react"
import Connect from "../components/Connect"
import Layout from "../components/Layout"
import { WixTokens } from "../dynamodb/models"

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

    console.log({ loading })

    return (
        <Layout>
            <Connect
                link={link.toString()}
                connected={access_token && refresh_token}
                loading={loading}
                onClick={(e) => setLoading(true)}
            />
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const keys = await WixTokens.get(1)

    return {
        props: {
            access_token: keys?.access_token || null,
            refresh_token: keys?.refresh_token || null,
        }, // will be passed to the page component as props
    }
}
