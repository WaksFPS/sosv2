import { IMG_NO_AVATAR } from '@/dictionary/images'
import { cn } from '@/lib/util'
import { Image } from 'react-native'

interface AvatarProps {
    uri?: string
    imageClassName?: string
}

const Avatar = (props: AvatarProps) => {
    const isValidUri = props.uri && props.uri.length > 0

    const imageSource = isValidUri ? { uri: props.uri } : IMG_NO_AVATAR

    return (
        <Image
            source={imageSource}
            className={cn('rounded-full h-10 w-10', props.imageClassName)}
        />
    )
}

export default Avatar
