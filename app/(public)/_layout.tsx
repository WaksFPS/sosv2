import { Slot, router, useFocusEffect } from 'expo-router'
import { useAuthenticate } from '@/hooks/useAuthenticate'

const PublicLayout = () => {
    const auth = useAuthenticate()

    useFocusEffect(() => {
        if (auth.isAuthenticated) {
            router.dismissAll()
            router.replace('/dashboard')
        }
    })

    return <Slot />
}

export default PublicLayout
