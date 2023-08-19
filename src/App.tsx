import * as React from 'react';
import {useColorScheme} from 'react-native';
import {useMaterial3Theme} from '@pchmn/expo-material3-theme';
import {PaperProvider, MD3DarkTheme, MD3LightTheme} from 'react-native-paper';
import {StatusBar} from 'expo-status-bar';


import {CachedResources} from "../resources/LoadToCache";

import Navigation from './Routes';

export default function App() {
    const isLoadingComplete = CachedResources();

    const colorScheme = useColorScheme();
    const {theme} = useMaterial3Theme();
    const paperTheme = colorScheme === 'dark' ? {...MD3DarkTheme, colors: theme.dark} : {
        ...MD3LightTheme,
        colors: theme.light
    };

    if (!isLoadingComplete) {
        return null;
    }

    return (
        <PaperProvider theme={paperTheme}>
            <Navigation theme={paperTheme}/>
            <StatusBar
                backgroundColor={colorScheme === 'dark' ? theme.dark.secondaryContainer : theme.light.secondaryContainer}/>
        </PaperProvider>
    );
}


