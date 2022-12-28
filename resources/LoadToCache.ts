import {useEffect, useState} from "react";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";

export function CachedResources() {
    const [isLoadingComplete, setLoadingComplete] = useState(false);
    async function loadResourcesAndDataAsync() {
        try {
            await SplashScreen.preventAutoHideAsync();

            // Load fonts
            await Font.loadAsync({
                'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
            });
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