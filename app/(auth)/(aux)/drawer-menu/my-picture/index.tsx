import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    Platform,
    Alert,
    Linking,
} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { SafeAreaView } from 'react-native-safe-area-context'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { LinearGradient } from 'expo-linear-gradient'
import TextScalable from '@/components/shared/text-scale'
import FontAwesomeIcons from '@expo/vector-icons/FontAwesome'
import FeatherIcons from '@expo/vector-icons/Feather'
import { useAtomValue } from 'jotai'
import { userDataAtom } from '@/store/user'
import { PhotoLauncherComponent } from './-component/photo-launcher-modal'
import { UseQueryResult, useQuery } from '@tanstack/react-query'
import { getMediaGalleryApi } from '@/services/endpoints/user'
import { Image } from 'expo-image'
import { LOADING_V2 } from '@/dictionary/lottie'
import LottieView from 'lottie-react-native'
import { UserMediaType } from '@/services/endpoints/user/schema'
import { router } from 'expo-router'
import { Footer } from '@/components/shared/footer'
import { Spinner } from '@/components/shared/spinner'
const pickImage = async (
    setModalVisible: (visible: boolean) => void,
    modalVisible: boolean,
) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== 'granted') {
        Alert.alert(
            'Permission for Storage was denied',
            'SOS requires access to your Storage to upload photos.',
            [
                { text: 'Cancel' },
                {
                    text: 'Settings',
                    onPress: () => {
                        Platform.OS === 'ios'
                            ? Linking.openURL('app-settings:')
                            : Linking.openSettings()
                    },
                },
            ],
        )
        return
    }
    setModalVisible(!modalVisible)
}

export const MyPicture = () => {
    const [modalVisible, setModalVisible] = useState(false)
    const [isPending, setIsPending] = useState(false)
    const userData = useAtomValue(userDataAtom)
    const userMediaLibrary = useQuery({
        queryKey: ['getMediaLibrary', userData.user.userId],
        queryFn: () => getMediaGalleryApi(userData.user.userId),
        staleTime: 0,
        enabled: !!userData?.user?.userId,
    })

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: '#FCC242' }}
            edges={['top']}
        >
            <Spinner visible={isPending} />
            <View className="bg-[#F1F1F2] h-full">
                <LinearGradient
                    colors={['#FCC242', '#F69940', '#F1753E']}
                    className="h-1/8  justify-center py-1.5"
                >
                    <View className="flex px-1.5 py-3">
                        <View className="flex-row justify-between items-center">
                            <MaterialCommunityIcons
                                size={28}
                                name="menu"
                                color="white"
                            />
                            <TextScalable
                                fontSize={18}
                                fontClassname="text-white font-bold"
                            >
                                My Pictures
                            </TextScalable>
                            <TouchableOpacity
                                onPress={() => router.push('/(auth)/dashboard')}
                            >
                                <MaterialCommunityIcons
                                    size={28}
                                    name="home"
                                    color="white"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </LinearGradient>
                <View className="flex flex-row justify-between items-center p-2  border-b-2  border-gray-200 ">
                    <TextScalable
                        fontSize={22}
                        fontClassname="font-bold text-gray-500"
                    >
                        Uploads: Photos({userMediaLibrary.data?.media.length})
                    </TextScalable>
                    {userMediaLibrary.data?.media.length !== 9 && (
                        <View className="items-end">
                            <TouchableOpacity
                                onPress={() =>
                                    pickImage(setModalVisible, modalVisible)
                                }
                            >
                                <TextScalable
                                    fontSize={16}
                                    fontClassname="text-gradient-orange"
                                >
                                    Add
                                </TextScalable>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
                <PictureComponent
                    userMediaGallery={userMediaLibrary}
                    userId={userData.user.userId}
                    setIsPending={setIsPending}
                />
                <Footer />
            </View>
            <PhotoLauncherComponent
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                setIsPending={setIsPending}
            />
        </SafeAreaView>
    )
}
interface PictureComponentProps {
    userMediaGallery: UseQueryResult<any, Error>
    userId: number
    setIsPending: React.Dispatch<React.SetStateAction<boolean>>
}
const PictureComponent: React.FC<PictureComponentProps> = (props) => {
    const { height } = Dimensions.get('screen')
    const { userMediaGallery, userId, setIsPending } = props
    const [primaryPhoto, setPrimaryPhoto] = useState<UserMediaType>()
    const [secondaryPhoto, setSecondaryPhoto] = useState<UserMediaType[]>([])
    const [modalVisible, setModalVisible] = useState(false)

    useEffect(() => {
        if (userMediaGallery.data) {
            setPrimaryPhoto(
                userMediaGallery.data?.media.filter(
                    (photo: UserMediaType) => photo.album_name !== 'Upload',
                )[0],
            )

            setSecondaryPhoto(
                userMediaGallery.data.media.filter(
                    (photo: any) => photo.album_name !== 'Profile',
                ),
            )
        }
    }, [userMediaGallery.data])

    const handlePicture = (
        isPrimary: boolean,
        url: string,
        photo: string,
        media_id: number,
    ) => {
        router.push({
            pathname:
                '(aux)/drawer-menu/my-picture/-component/picture-component',
            params: {
                isPrimary: isPrimary.toString(),
                photoPath: photo,
                userId: userId.toString(),
                urlToSave: url,
                mediaId: media_id.toString(),
            },
        })
    }
    return (
        <>
            <View className="flex p-1">
                <View>
                    <View
                        className="flex-row w-full"
                        style={{ height: height / 3 }}
                    >
                        <TouchableOpacity
                            onPress={() =>
                                primaryPhoto
                                    ? handlePicture(
                                          true,
                                          primaryPhoto.path,
                                          primaryPhoto.s3_path,
                                          primaryPhoto.media_id,
                                      )
                                    : pickImage(setModalVisible, modalVisible)
                            }
                            className="bg-[#E6E6E6] m-1.5 justify-center items-center flex-[2] rounded-lg "
                        >
                            {userMediaGallery.fetchStatus === 'fetching' ? (
                                <LottieView
                                    source={LOADING_V2}
                                    autoPlay
                                    loop
                                    style={{ width: 25, height: 25 }}
                                />
                            ) : (
                                <>
                                    {primaryPhoto ? (
                                        <Image
                                            source={primaryPhoto.s3_path}
                                            className=" w-full h-full "
                                            transition={1000}
                                        />
                                    ) : (
                                        <FontAwesomeIcons
                                            size={45}
                                            name="user"
                                            color="#737373"
                                        />
                                    )}
                                </>
                            )}
                        </TouchableOpacity>
                        <View className="flex-1 flex-col">
                            {Array.from({ length: 2 }).map((val, i) => {
                                const firstPhotoRow = secondaryPhoto[i]
                                return (
                                    <TouchableOpacity
                                        key={i}
                                        onPress={() =>
                                            !firstPhotoRow
                                                ? pickImage(
                                                      setModalVisible,
                                                      modalVisible,
                                                  )
                                                : handlePicture(
                                                      false,
                                                      firstPhotoRow.path,
                                                      firstPhotoRow.s3_path,
                                                      firstPhotoRow.media_id,
                                                  )
                                        }
                                        className="bg-[#E6E6E6] m-1.5 justify-center items-center flex-[2] rounded-lg "
                                    >
                                        {userMediaGallery.fetchStatus ===
                                        'fetching' ? (
                                            <LottieView
                                                source={LOADING_V2}
                                                autoPlay
                                                loop
                                                style={{
                                                    width: 25,
                                                    height: 25,
                                                }}
                                            />
                                        ) : (
                                            <>
                                                {firstPhotoRow ? (
                                                    <Image
                                                        source={
                                                            firstPhotoRow.s3_path
                                                        }
                                                        className=" w-full h-full "
                                                        transition={1000}
                                                    />
                                                ) : (
                                                    <Text>
                                                        <FeatherIcons
                                                            size={37}
                                                            name="plus"
                                                            color="#737373"
                                                        />
                                                    </Text>
                                                )}
                                            </>
                                        )}
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    </View>
                    <View className="flex-col">
                        <View
                            className="flex-row"
                            style={{ height: height / 6 }}
                        >
                            {Array.from({ length: 3 }).map((val, i) => {
                                const secondPhotoRow = secondaryPhoto[i + 2]

                                return (
                                    <TouchableOpacity
                                        key={i}
                                        onPress={() =>
                                            !secondPhotoRow
                                                ? pickImage(
                                                      setModalVisible,
                                                      modalVisible,
                                                  )
                                                : handlePicture(
                                                      false,
                                                      secondPhotoRow.path,
                                                      secondPhotoRow.s3_path,
                                                      secondPhotoRow.media_id,
                                                  )
                                        }
                                        className="bg-[#E6E6E6] m-1.5 justify-center items-center flex-[2] rounded-lg "
                                    >
                                        {userMediaGallery.fetchStatus ===
                                        'fetching' ? (
                                            <LottieView
                                                source={LOADING_V2}
                                                autoPlay
                                                loop
                                                style={{
                                                    width: 25,
                                                    height: 25,
                                                }}
                                            />
                                        ) : (
                                            <>
                                                {secondaryPhoto &&
                                                secondPhotoRow ? (
                                                    <Image
                                                        source={
                                                            secondPhotoRow.s3_path
                                                        }
                                                        className=" w-full h-full "
                                                        transition={1000}
                                                    />
                                                ) : (
                                                    <Text>
                                                        <FeatherIcons
                                                            size={37}
                                                            name="plus"
                                                            color="#737373"
                                                        />
                                                    </Text>
                                                )}
                                            </>
                                        )}
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    </View>
                    <View className="flex-col">
                        <View
                            className="flex-row w-full"
                            style={{ height: height / 6 }}
                        >
                            {Array.from({ length: 3 }).map((val, i) => {
                                const thirdPhotoRow = secondaryPhoto[i + 5]
                                return (
                                    <TouchableOpacity
                                        key={i}
                                        onPress={() =>
                                            !thirdPhotoRow
                                                ? pickImage(
                                                      setModalVisible,
                                                      modalVisible,
                                                  )
                                                : handlePicture(
                                                      false,
                                                      thirdPhotoRow.path,
                                                      thirdPhotoRow.s3_path,
                                                      thirdPhotoRow.media_id,
                                                  )
                                        }
                                        className="bg-[#E6E6E6] m-1.5 justify-center items-center flex-[2] rounded-lg "
                                    >
                                        {thirdPhotoRow ? (
                                            <Image
                                                source={thirdPhotoRow.s3_path}
                                                className=" w-full h-full "
                                                transition={1000}
                                            />
                                        ) : (
                                            <Text>
                                                <FeatherIcons
                                                    size={37}
                                                    name="plus"
                                                    color="#737373"
                                                />
                                            </Text>
                                        )}
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    </View>
                </View>
                <PhotoLauncherComponent
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    setIsPending={setIsPending}
                />
            </View>
        </>
    )
}

export default MyPicture
