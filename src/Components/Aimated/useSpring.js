// import React from 'react'
// import { State } from "react-native-gesture-handler";

// import Animated from 'react-native-reanimated'
// const {
//     set,
//     cond,
//     eq,
//     spring,
//     startClock,
//     stopClock,
//     clockRunning,
//     defined,
//     Value,
//     Clock,
//     event,
//     block,
//     add,
//     call,
// } = Animated
// import { snapPoint, useClock, useValue } from "react-native-redash";

// export const useSpring = ({
//     value,
//     velocity,
//     state: gestureState,
//     snapPoints,
//     onSnap,
// }) => {

//     const clock = useClock();
//     const offset = useValue(0);
//     const state = {
//         finished: useValue(0),
//         velocity: useValue(0),
//         position: useValue(0),
//         time: useValue(0),
//     };
//     const config = {
//         toValue: useValue(0),
//         damping: 6,
//         mass: 1,
//         stiffness: 64,
//         overshootClamping: useValue(0),
//         restSpeedThreshold: useValue(0.01),
//         restDisplacementThreshold: useValue(0.01),

//     };
//     return block([
//         cond(eq(gestureState, State.BEGAN), [
//             set(offset, state.position),
//             stopClock(clock),
//             set(state.finished, 0),
//             set(state.time, 0)
//         ]),
//         cond(eq(gestureState, State.ACTIVE), [
//             set(state.position, add(offset, value)),
//             set(state.velocity, velocity),
//             set(
//                 config.toValue,
//                 snapPoint(state.position, state.velocity, snapPoints)),
//             cond(
//                 eq(config.toValue, 0)
//                 [

//                     set(config.overshootClamping, 0),
//                     set(config.restSpeedThreshold, 0.01),
//                     set(config.restDisplacementThreshold, 0.01)
//                 ],
//                 [

//                     set(config.overshootClamping, 1),
//                     set(config.restSpeedThreshold, 200),
//                     set(config.restDisplacementThreshold, 200),
//                 ]
//             ),
//         ]),
//         cond(eq(gestureState, State.END),[
//                 startClock(clock),
//                 spring(clock, state, config),
//                 cond(state.finished, [onSnap && call([state.position], onSnap)])
//             ]),
//         state.position,
//     ]);
// }
//     ;
import React from 'react'
import { State } from "react-native-gesture-handler";

import Animated from 'react-native-reanimated'
const {
    set,
    cond,
    eq,
    spring,
    startClock,
    stopClock,
    clockRunning,
    defined,
    Value,
    Clock,
    event,
    block,
    add,
    call,
} = Animated
import { snapPoint, useClock, useValue } from "react-native-redash";

export const useSpring = ({
    value,
    velocity,
    state: gestureState,
    snapPoints,
    onSnap,
}) => {

    const clock = useClock();
    const offset = useValue(0);
    const state = {
        finished: useValue(0),
        velocity: useValue(0),
        position: useValue(0),
        time: useValue(0),
    };
    const config = {
        toValue: useValue(0),
        damping: 7,
        mass: 1,
        stiffness: 121.6,
        overshootClamping: useValue(1),
        restSpeedThreshold: useValue(0.01),
        restDisplacementThreshold: useValue(0.01),
    };
    return block([
        cond(clockRunning(clock), 0, [
            set(state.finished, 0),
            set(state.velocity, velocity),
            set(state.position, value),
            startClock(clock)
        ]),
        spring(clock, state, config),
        cond(state.finished, stopClock(clock), [onSnap && call([state.position], onSnap)]),
        state.position
    ]);
};