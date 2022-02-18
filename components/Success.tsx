import { Box, Heading, Text } from "@chakra-ui/react"
import { CheckCircleIcon } from "@chakra-ui/icons"

export default function Success() {
    return (
        <Box textAlign="center" py={10} px={6}>
            <CheckCircleIcon boxSize={"50px"} color={"green.500"} />
            <Heading as="h2" size="xl" mt={6} mb={2}>
                You have connected your Wix Account!
            </Heading>
            <Text color={"gray.500"}>
                You are now setup to have have facebook find your items
            </Text>
        </Box>
    )
}
