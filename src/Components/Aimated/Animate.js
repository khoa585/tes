import React from 'react'
import { View, Text } from 'react-native'
import Background from './Background';
import Card from './Cards';
import { useTransition } from 'react-native-redash';
import { interpolate, sub } from 'react-native-reanimated';
import { createBox } from '@shopify/restyle';
import { Theme } from './Theme';
const Box = createBox(Theme)
const card_ = [
    {
        index: 10,
    },
    {
        index: 9,
    },
    {
        index: 8,
    },
    {
        index: 7,
    },
    {
        index: 6,
    },
    {
        index: 5,
    },
    {
        index: 4,
    },
    {
        index: 3,
    },
    {
        index: 2,
    },
    {
        index: 1,
    },
    {
        index: 0,
    }
]
export default function Animate() {
    const [currentIndex, setcurrentIndex] = React.useState(0)
    const aIndex = useTransition(currentIndex)
    const step = 1 / (card_.length - 1)
    return (
        <Box flex={1}>
            <Box flex={1}>
                <Background></Background>
                {
                    card_.map(({ index }) => (
                        index * step + step > currentIndex && (<Card key={index} position={sub(index * step, aIndex)}
                            onSwap={() => { setcurrentIndex((prev) => prev + step) }}
                        ></Card>)
                    ))
                }
            </Box>
        </Box>
    )
}


