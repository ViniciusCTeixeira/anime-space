import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import {StatusBar} from 'expo-status-bar';
import {Platform} from "react-native";
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useEffect, useState} from "react";

import {UseColorScheme} from "./services/ThemeColorService";
import Navigation from './Routes';


export function App() {
    const isLoadingComplete = cachedResources();
    const colorScheme = UseColorScheme();

    if (!isLoadingComplete) {
        return null;
    }

    return (
        <SafeAreaProvider>
            <Navigation colorScheme={colorScheme}/>
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'}/>
        </SafeAreaProvider>
    );
}

export function cachedResources() {
    const [isLoadingComplete, setLoadingComplete] = useState(false);

    // Load any resources or data that we need prior to rendering the app
    async function loadResourcesAndDataAsync() {
        try {
            await SplashScreen.preventAutoHideAsync();

            // Load fonts
            await Font.loadAsync({
                'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
            });
        } catch (e) {
            // We might want to provide this error information to an error reporting service
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
