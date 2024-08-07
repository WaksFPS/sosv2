import { ActivityIndicator, View, Text } from 'react-native'

export const LoadingScreen = () => {
    return (
        <View className="mt-20 px-5 flex items-center ">
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>Loading Please Wait...</Text>
        </View>
    )
}
