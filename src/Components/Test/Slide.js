import * as React from 'react';
import {
    StatusBar,
    Image,
    FlatList,
    Dimensions,
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    Animated
} from 'react-native';
import {
    FlingGestureHandler,
    Directions,
    State,
} from 'react-native-gesture-handler';
import { mix, mixColor, withSpring, withTimingTransition } from "react-native-redash";
const DATA = [
    {
        poster:
            'https://www.creative-flyers.com/wp-content/uploads/2020/07/Afro-vibes-flyer-template.jpg',
    },
    {
        poster:
            'https://www.creative-flyers.com/wp-content/uploads/2019/11/Jungle-Party-Flyer-Template-1.jpg',
    },
    {
        poster:
            'https://www.creative-flyers.com/wp-content/uploads/2020/06/4th-Of-July-Invitation.jpg',
    },
    {
        poster:
            'https://www.creative-flyers.com/wp-content/uploads/2020/07/Summer-Music-Festival-Poster.jpg',
    },
    {
        poster:
            'https://www.creative-flyers.com/wp-content/uploads/2020/06/BBQ-Flyer-Psd-Template.jpg',
    },
    {
        poster:
            'https://www.creative-flyers.com/wp-content/uploads/2020/06/Festival-Music-PSD-Template.jpg',
    },
    {
        poster:
            'https://www.creative-flyers.com/wp-content/uploads/2020/06/Summer-Beach-House-Flyer.jpg',
    },
    {
        poster:
            'https://www.creative-flyers.com/wp-content/uploads/2020/06/Summer-Beach-House-Flyer.jpg',
    },
    {
        poster:
            'https://www.creative-flyers.com/wp-content/uploads/2020/06/Summer-Beach-House-Flyer.jpg',
    },
    {
        poster:
            'https://www.creative-flyers.com/wp-content/uploads/2020/06/Summer-Beach-House-Flyer.jpg',
    },
];
// import Animated, { add, sub } from "react-native-reanimated";
import { createBox } from '@shopify/restyle';
import { Theme } from '../Aimated/Theme';
const Box = createBox(Theme);

const { width, height } = Dimensions.get('window')
const OVERFLOW_HEIGHT = 70;
const SPACING = 10;
const ITEM_WIDTH = width * 0.76;
const ITEM_HEIGHT = ITEM_WIDTH * 1.4;
const VISIBLE_ITEMS = 3;
const List = ({ translateX_, index_, item, index, scrollXAnimated }) => {
    const inputRange_ = [index - 1, index, index + 1];
    const translateY = scrollXAnimated.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [-20, 0, 0],
    });
    const translateX = scrollXAnimated.interpolate({
        inputRange: [index - 1, index, index + 0.5, index + 1],
        outputRange: [translateX_, 0, 50, translateX_],
    });
    const translateY_ = scrollXAnimated.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [-20, 0, 200],
    });
    const scale = scrollXAnimated.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [0.95, 1, 1],
    });
    const borderRadius = 10
    const opacity = scrollXAnimated.interpolate({
        inputRange: [index - 1, index, index + 0.9, index + 1],
        outputRange: [0.95, 1, 1, 0],
    });
    const rotate = scrollXAnimated.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: ["-10deg", "-10deg", "-10deg"],
    });
    return (
        <Box
            style={StyleSheet.absoluteFillObject}
            justifyContent='center'
            alignItems='center'
        >
            <Animated.View
                style={{
                    opacity,
                    transform: [
                        { translateY: index_ - 1 === index ? translateY_ : translateY },
                        { scale },
                        { rotate: index_ - 1 === index ? rotate : '0deg' },
                        { translateX: index_ - 1 === index ? translateX : 0 }
                    ],
                }}
            >
                <Image
                    source={{ uri: item.poster }}
                    style={{
                        width: ITEM_WIDTH,
                        height: ITEM_HEIGHT,
                        borderRadius,
                    }}
                />
            </Animated.View>
        </Box>
    );
}
export default function Slide() {
    const scrollXIndex = React.useRef(new Animated.Value(0)).current;
    const scrollXAnimated = React.useRef(new Animated.Value(0)).current;

    const [index_, setIndex] = React.useState(0);
    const [translateX_, setTranslateX] = React.useState(0);
    const setActiveIndex = React.useCallback((activeIndex) => {
        scrollXIndex.setValue(activeIndex);
        setIndex(activeIndex);
    });

    React.useEffect(() => {
        Animated.spring(scrollXAnimated, {
            toValue: scrollXIndex,
            damping: 6,
            mass: 1,
            stiffness: 121.6,
            overshootClamping: false,
            restSpeedThreshold: 0.01,
            restDisplacementThreshold: 0.01,
            useNativeDriver: false,
        }).start();
    });
    return (
        <Box flex={1}>
            <Box flex={1}>
                <FlingGestureHandler
                    key='left'
                    direction={Directions.LEFT}
                    onHandlerStateChange={(ev) => {
                        if (ev.nativeEvent.state === State.ACTIVE) {
                            Animated.spring(scrollXAnimated, {
                                toValue: scrollXIndex,
                                damping: 6,
                                mass: 1,
                                stiffness: 121.6,
                                overshootClamping: true,
                                restSpeedThreshold: 0.01,
                                restDisplacementThreshold: 0.01,
                                useNativeDriver: false,
                            }).start();
                        }
                        if (ev.nativeEvent.state === State.END) {
                            if (index_ === 0) {
                                return;
                            }
                            setActiveIndex(index_ - 1);
                            setTranslateX(width * 1.5)
                        }
                    }}
                >
                    <FlingGestureHandler
                        key='right'
                        direction={Directions.RIGHT}

                        onHandlerStateChange={(ev) => {
                            if (ev.nativeEvent.state === State.END) {
                                if (index_ === DATA.length - 1) {
                                    return;
                                }
                                setActiveIndex(index_ + 1);
                                setTranslateX(width * 1.5)
                            }
                        }}
                    >
                        <SafeAreaView style={styles.container}>
                            <FlatList
                                data={DATA}
                                keyExtractor={(_, index) => String(index)}
                                horizontal
                                inverted
                                contentContainerStyle={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    padding: SPACING * 2,
                                    marginTop: 50,
                                }}
                                scrollEnabled={false}
                                removeClippedSubviews={false}
                                CellRendererComponent={({
                                    item,
                                    index,
                                    children,
                                    style,
                                    ...props
                                }) => {
                                    const newStyle = [style, { zIndex: DATA.length - index }];
                                    return (
                                        <View style={newStyle} index={index} {...props}>
                                            {children}
                                        </View>
                                    );
                                }}
                                renderItem={({ item, index }) => {
                                    return (<List translateX_={translateX_} item={item} index_={index_} index={index} scrollXAnimated={scrollXAnimated} ></List>)
                                }}
                            >

                            </FlatList>
                        </SafeAreaView>
                    </FlingGestureHandler>
                </FlingGestureHandler>
            </Box>
        </Box>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
});




