import {Platform, StatusBar, Image} from "react-native";
import { Block, GalioProvider } from 'galio-framework';

import {materialTheme} from './constants/';
import {CachedResources} from "../resources/LoadToCache";

import { NavigationContainer } from '@react-navigation/native';
import Screens from './navigation/Screens';

// Before rendering any navigation stack
import { enableScreens } from 'react-native-screens';
enableScreens();

export default function App() {
    const isLoadingComplete = CachedResources();

    if (!isLoadingComplete) {
        return null;
    }

    return (
        <NavigationContainer>
          <GalioProvider theme={materialTheme}>
            <Block flex>
              {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
              <Screens />
            </Block>
          </GalioProvider>
        </NavigationContainer>
      );
}


