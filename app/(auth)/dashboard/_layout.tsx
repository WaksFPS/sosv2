import { Drawer } from 'expo-router/drawer'
import CustomDrawerContent from '../(aux)/drawer/drawer'
import { Slot, Stack } from 'expo-router'

export const DashboardLayout = () => {
    return <Stack screenOptions={{ headerShown: false }} />
}

export default DashboardLayout
