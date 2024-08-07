import { Stack } from 'expo-router'

const SignUpLayout = () => {
    return (
        <Stack screenOptions={{ animation: 'fade' }}>
            <Stack.Screen
                name="questionnaire"
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="personal-questionnaire"
                options={{ headerShown: false }}
            />
        </Stack>
    )
}

export default SignUpLayout
