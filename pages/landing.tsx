import { GetServerSideProps } from "next"
import Failure from "../components/Failure"
import Layout from "../components/Layout"
import PublicLayout from "../components/PublicLayout"
import Success from "../components/Success"
import { WixTokens } from "../dynamodb/models"

export default function Landing({ access_token, refresh_token }) {
    return (
        <PublicLayout>
            {access_token && refresh_token ? <Success /> : <Failure />}
        </PublicLayout>
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
