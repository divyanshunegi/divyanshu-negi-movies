import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import React, {useCallback} from 'react';
import {Animated, StatusBar, StyleSheet} from 'react-native';
const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    flex: {
        flex: 1,
    },
});

const Splash = () => {
    const navigation = useNavigation();
    const scale = new Animated.Value(1);
    const resetNavigation = useCallback(() => {
        Animated.timing(scale, {
            toValue: 2000,
            duration: 200,
            useNativeDriver: true,
        }).start(() => {
            navigation.reset({
                index: 0,
                routes: [{name: 'Start'}],
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <StatusBar barStyle="dark-content" />
            <Animated.View style={[style.container, {transform: [{scale}]}]}>
                <LottieView
                    source={require('../assets/splash.json')}
                    style={style.flex}
                    speed={2}
                    autoPlay
                    loop={false}
                    resizeMode="contain"
                    onAnimationFinish={resetNavigation}
                />
            </Animated.View>
        </>
    );
};

export default Splash;
