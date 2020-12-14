import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native'
export default function Animate() {
    const { width, height } = Dimensions.get('window')
    return (
        <View style={{ ...StyleSheet.absoluteFillObject, width: width, height: height }}>
            <View style={{ flex: 1 / 3, backgroundColor: '#3bdaa2' }}>
                <View style={{ flex: 1, backgroundColor: "#fff", borderBottomRightRadius: 50, }}>

                </View>
            </View>
            <View style={{backgroundColor: "#fff", flex: 1 / 3 }}>
                <Image
                    style={{  ...StyleSheet.absoluteFillObject,width: '100%', height: '100%', borderBottomRightRadius: 50,borderTopLeftRadius: 50}}
                    source={{
                        uri: 'https://static.dribbble.com/users/2543587/screenshots/14004374/image.png',
                    }}>
                </Image>
            </View>
            <View style={{ flex: 1 / 3, backgroundColor: '#3bdaa2' }}>
                <View style={{ flex: 1, backgroundColor: "#fff", borderTopLeftRadius: 50, }}>

                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: '0',
        left: '0',
        
    }
})