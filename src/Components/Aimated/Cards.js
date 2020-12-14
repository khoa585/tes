import React from 'react'
import { Dimensions, StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import Animated, { add } from "react-native-reanimated";
import { mix, usePanGestureHandler, mixColor, withSpring } from "react-native-redash";
import { PanGestureHandler, FlingGestureHandler, State, Directions } from "react-native-gesture-handler";
const { width: wWidth, height: hHeight } = Dimensions.get('window')
const width = wWidth * 0.8;
const height = wWidth * (425 / 394);
import { useSpring } from './useSpring';
import { createBox } from '@shopify/restyle';
import { Theme } from './Theme';
const Box = createBox(Theme);
const Cards = ({ position, onSwap }) => {

    const { gestureHandler, velocity, state, translation } = usePanGestureHandler();
    const backgroundColor = mixColor(position, "#f1faee", "#a8dadc");
    const translateOffSetY = mix(position, 0, -100)
    const scale = mix(position, 1, 0.9)
    const borderRadius = 25
    const translateX = useSpring({
        value: translation.x,
        velocity: velocity.x,
        state,
        snapPoints: [-wWidth, 0, wWidth],
        onSnap: ([x]) => x !== 0 && onSwap()
    });
    const translateY = add(translateOffSetY,
        withSpring({
            value: translation.y,
            velocity: velocity.y,
            state: state,
            snapPoints: [0],
        })
    )
    return (
        <Box
            style={StyleSheet.absoluteFillObject}
            justifyContent='center'
            alignItems='center'
        >
            <PanGestureHandler {...gestureHandler}>
                <Animated.View
                    style={{
                        backgroundColor,
                        transform: [
                            { translateY },
                             { translateX },
                            { scale },
                        ],
                        borderRadius,
                        width,
                        height,

                    }}
                ></Animated.View>
            </PanGestureHandler>

        </Box>
    )
}
export default Cards;



