import {StatusBar} from 'expo-status-bar';
import {Platform} from "react-native";
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {CachedResources} from "../resources/LoadToCache";

import Navigation from './Routes';

export default function App() {
    const isLoadingComplete = CachedResources();

    if (!isLoadingComplete) {
        return null;
    }

    return (
        <SafeAreaProvider>
            <Navigation/>
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'}/>
        </SafeAreaProvider>
    );
}


