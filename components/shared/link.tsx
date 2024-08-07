import { LinearGradient } from 'expo-linear-gradient'
import { Link as ExpoLink } from 'expo-router'
import { LinkProps } from 'expo-router/build/link/Link'
import { Text, TouchableOpacity } from 'react-native'

import { cn } from '@/lib/util'

interface CustomLinkProps extends LinkProps<CustomLinkProps> {
    containerClassName?: string
    buttonClassName?: string
    textClassName?: string
    type?: 'button' | 'link'
    gradientColors?: string[]
}

export const Link = (props: CustomLinkProps) => {
    const colors = props.gradientColors || ['#FDC830', '#F57435']
    if (props.type === 'link') {
        return (
            <ExpoLink
                {...props}
                className={cn('', props.buttonClassName)}
                accessibilityRole="link"
            >
                <Text
                    className={cn(
                        'text-background-alt text-lg font-bold',
                        props.textClassName,
                    )}
                >
                    {props.children}
                </Text>
            </ExpoLink>
        )
    }

    return (
        <ExpoLink {...props} asChild>
            <TouchableOpacity
                className={cn('px-10 py-5', props.containerClassName)}
            >
                <LinearGradient
                    colors={colors}
                    className={cn(
                        'items-center justify-center rounded-2xl p-2',
                        props.buttonClassName,
                    )}
                >
                    <Text className={cn('text-white', props.textClassName)}>
                        {props.children}
                    </Text>
                </LinearGradient>
            </TouchableOpacity>
        </ExpoLink>
    )
}
