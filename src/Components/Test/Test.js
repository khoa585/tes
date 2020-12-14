import React from 'react'
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Animated, Dimensions } from 'react-native'

export default function Test() {
    const { width, height } = Dimensions.get('window')
    const ITEM_SIZE = width * 0.72
    const SPACER_ITEM_SIZE = (width - ITEM_SIZE) / 2;
    const scrollX = React.useRef(new Animated.Value(0)).current;
    const DATA = [
        { key: 'left-spacer' },
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            title: 'First Item',
        },
        {
            id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
            title: 'Second Item',
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d72',
            title: 'Third Item',
        },
        {
            id: '58694a0fs-3da1-471f-bd96-145571e29d72',
            title: 'Third Item',
        },
        {
            id: '58694da0f-3da1-471f-bd96-145571e29d72',
            title: 'Third Item',
        },
        { key: 'right-spacer' }
    ];
    return (
        <SafeAreaView style={styles.container}>
            <Animated.FlatList
                showsHorizontalScrollIndicator={false}
                decelerationRate={0}
                snapToInterval={ITEM_SIZE}
                bounces={false}
                horizontal
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: true }
                )}
                scrollEventThrottle={16}
                data={DATA}
                renderItem={({ item, index }) => {
                    if (!item.id) {
                        return (
                            <View
                                style={{
                                    width: SPACER_ITEM_SIZE,
                                    backgroundColor: 'red'
                                }}
                            />
                        );
                    }
                    const inputRange = [
                        (index - 2) * ITEM_SIZE,
                        (index - 1) * ITEM_SIZE,
                        index * ITEM_SIZE,
                    ];
                    const translateY = scrollX.interpolate({
                        inputRange,
                        outputRange: [100, 50, 100],
                    });
                    return <View style={{ width: ITEM_SIZE }}>
                        <Animated.View
                            style={{
                                marginHorizontal: 10,
                                padding: 10 * 2,
                                alignItems: 'center',
                                backgroundColor: 'white',
                                borderRadius: 34,
                                transform: [{ translateY }],
                            }}
                        >
                            <View style={styles.item}>
                                <Text style={styles.title}>{item.title}</Text>
                            </View>
                        </Animated.View>
                    </View>
                }}

                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        height: 300,
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
});
