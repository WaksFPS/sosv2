import { Button } from '@/components/shared/button'
import TextScalable from '@/components/shared/text-scale'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Image } from 'expo-image'
import { View, Dimensions } from 'react-native'
import { router } from 'expo-router'
const { width } = Dimensions.get('window')
const UploadPhotoPage = () => {
    const handleNext = () => {
        router.push('/(aux)/about-yourself/confirmation')
    }
    const testLiveImg =
        'https://i.pinimg.com/736x/e5/59/a4/e559a43c018434ed69c5220f85f0f6d6.jpg'
    return (
        <View className="bg-background-secondary flex-1">
            <View className="pt-10">
                <TextScalable
                    fontSize={25}
                    fontClassname="font-bold text-center text-sos-gray py-10"
                >
                    Profile Picture
                </TextScalable>
            </View>

            <View className="flex-1">
                {testLiveImg ? (
                    <View
                        className="self-center items-center  my-8 overflow-hidden "
                        style={pictureIconStyle}
                    >
                        <Image
                            source={testLiveImg}
                            className=" w-full h-full "
                            transition={1000}
                        />
                    </View>
                ) : (
                    <View
                        className="self-center justify-center my-8 border-2 border-white/0 bg-disabled"
                        style={pictureIconStyle}
                    >
                        <Ionicons
                            name="person"
                            size={100}
                            color="white"
                            style={{
                                textAlign: 'center',
                            }}
                        />
                    </View>
                )}

                <View className="self-center">
                    <Button
                        buttonClassName="rounded-3xl mb-[10%]"
                        gradientColors={['#F37335', '#F37335']}
                        style={{ width: 200 }}
                        // onPress={() => handleNext()} //TODO: Upload photo functionality/page similar to my picture
                    >
                        Upload Photos
                    </Button>
                </View>
            </View>
            <View className="self-center">
                <Button
                    buttonClassName="rounded-3xl mb-[10%]"
                    gradientColors={['#F37335', '#F37335']}
                    style={{ width: 200 }}
                    onPress={() => handleNext()}
                >
                    Next
                </Button>
            </View>
        </View>
    )
}

const pictureIconStyle = {
    borderRadius: width * 0.5,
    height: width * 0.5,
    width: width * 0.5,
}
export default UploadPhotoPage
