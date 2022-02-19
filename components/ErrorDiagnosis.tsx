import { Box, Heading, Text, Button } from "@chakra-ui/react"

interface ErrorDiagnosisProps {
    code: number
    title: string
    description: string
    linkText: string
    linkHref: string
}

export default function ErrorDiagnosis({
    code,
    title,
    description,
    linkText,
    linkHref,
}: ErrorDiagnosisProps) {
    return (
        <Box textAlign="center" py={10} px={6}>
            <Heading
                display="inline-block"
                as="h2"
                size="2xl"
                bgGradient="linear(to-r, teal.400, teal.600)"
                backgroundClip="text"
            >
                {code}
            </Heading>
            <Text fontSize="18px" mt={3} mb={2}>
                {title}
            </Text>
            <Text color={"gray.500"} mb={6}>
                {description}
            </Text>

            <a href={linkHref}>
                <Button
                    colorScheme="teal"
                    bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
                    color="white"
                    variant="solid"
                >
                    {linkText}
                </Button>
            </a>
        </Box>
    )
}
