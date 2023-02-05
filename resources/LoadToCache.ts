import {useEffect, useState} from "react";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import * as NavigationBar from 'expo-navigation-bar';
import {Platform} from "react-native";

export function CachedResources() {
    const [isLoadingComplete, setLoadingComplete] = useState(false);
    async function loadResourcesAndDataAsync() {
        try {
            await SplashScreen.preventAutoHideAsync();

            // Load fonts
            await Font.loadAsync({
                'roboto': require('../assets/fonts/Roboto-Regular.ttf'),
            });

            if (Platform.OS !== 'ios') {
                await NavigationBar.setVisibilityAsync("hidden");
                await NavigationBar.setBehaviorAsync("overlay-swipe");
            }

        } catch (e) {
            console.warn(e);
        } finally {
            setLoadingComplete(true);
            await SplashScreen.hideAsync();
        }
    }

    useEffect(() => {
        loadResourcesAndDataAsync().then();
    }, []);

    return isLoadingComplete;
}