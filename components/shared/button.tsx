import { LinearGradient } from 'expo-linear-gradient'
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { cn } from '@/lib/util'
import { LOADING } from '@/dictionary/lottie'
import LottieView from 'lottie-react-native'

interface ButtonProps extends TouchableOpacityProps {
    buttonClassName?: string
    textClassName?: string
    gradientColors?: string[]
    isLoading?: boolean
}

export const Button = (props: ButtonProps) => {
    const colors = props.gradientColors || ['#FDC830', '#F57435']
    return (
        <TouchableOpacity
            {...props}
            className={cn(
                props.disabled &&
                    'items-center justify-center rounded-2xl p-2 ',
            )}
        >
            <LinearGradient
                colors={!props.disabled ? colors : ['#BFBFBF', '#BFBFBF']}
                className={cn(
                    'items-center justify-center w-full rounded-2xl p-2 h-12',
                    props.buttonClassName,
                )}
            >
                <TextGradient {...props} />
            </LinearGradient>
        </TouchableOpacity>
    )
}

const TextGradient = (props: ButtonProps) => {
    if (props.disabled) {
        return (
            <>
                {props.isLoading ? (
                    <LottieView
                        source={LOADING}
                        autoPlay
                        loop
                        style={{ width: 25, height: 25 }}
                    />
                ) : (
                    <Text
                        className={cn(
                            'font-bold text-white',
                            props.textClassName,
                        )}
                    >
                        {props.children}
                    </Text>
                )}
            </>
        )
    }

    return (
        <>
            {props.isLoading ? (
                <LottieView
                    source={LOADING}
                    autoPlay
                    loop
                    style={{ width: 25, height: 25 }}
                />
            ) : (
                <Text
                    className={cn('font-bold text-white', props.textClassName)}
                >
                    {props.children}
                </Text>
            )}
        </>
    )
}
