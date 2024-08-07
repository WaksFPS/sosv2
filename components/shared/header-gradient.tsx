import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { StyleSheet } from 'react-native'

const GradientHeader: React.FC = () => {
    return (
        <LinearGradient
            colors={['#FDC830', '#F57435']}
            style={StyleSheet.absoluteFill}
        />
    )
}

export default GradientHeader
