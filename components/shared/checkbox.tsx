import React, { useState, useCallback } from 'react'
import { TouchableOpacity, View } from 'react-native'

interface CheckboxProps {
    isChecked: boolean
    onPress: () => void
    setIsChecked: (checked: boolean) => void
    innerColor?: string
}

const Checkbox: React.FC<CheckboxProps> = ({
    isChecked,
    onPress,
    setIsChecked,
    innerColor,
}) => {
    const [internalChecked, setInternalChecked] = useState(isChecked)

    const handlePress = useCallback(() => {
        const newChecked = !internalChecked
        setInternalChecked(newChecked)
        setIsChecked(newChecked)
        onPress()
    }, [internalChecked, onPress, setIsChecked])

    return (
        <TouchableOpacity onPress={handlePress} style={{ marginRight: 8 }}>
            <View
                style={{
                    width: 24,
                    height: 24,
                    borderWidth: 1,
                    borderColor: 'black',
                    borderRadius: 4,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {internalChecked && (
                    <View
                        style={{
                            width: 12,
                            height: 12,
                            backgroundColor: innerColor ? innerColor : 'black',
                            borderRadius: 2,
                        }}
                    />
                )}
            </View>
        </TouchableOpacity>
    )
}

export default Checkbox
