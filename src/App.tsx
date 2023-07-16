import * as React from 'react';
import { PaperProvider } from 'react-native-paper';

import {CachedResources} from "../resources/LoadToCache";

import Navigation from './Routes';

export default function App() {
    const isLoadingComplete = CachedResources();

    if (!isLoadingComplete) {
        return null;
    }

    return (
        <PaperProvider>
            <Navigation/>
        </PaperProvider>
    );
}


