import { cn } from '@/lib/util'
import React from 'react'
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native'

interface DividerProps {
    style?: StyleProp<ViewStyle>
}

const Divider: React.FC<DividerProps> = ({ style }) => {
    return (
        <View
            style={{ height: 0.3 }}
            className={cn(`h-0.5 bg-white w-full my-0.5`, style)}
        />
    )
}

export default Divider
