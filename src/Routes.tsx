import * as React from 'react';
import {FontAwesome} from '@expo/vector-icons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {DarkTheme, DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ColorSchemeName, Pressable} from 'react-native';
import {TabBarIconFontAwesome, TabBarIconFeather} from './components/IconsComponent';

import {RootStackParamList, RootTabParamList, RootTabScreenProps} from './resources/types/ReactNavigationType';

import Colors from './resources/constants/ColorsConstant';
import {UseColorScheme} from "./services/ThemeColorService";

import NotFoundScreen from './screens/NotFoundScreen';
import TabMangas from './screens/mangas/TabMangas';
import ModalMangas from './screens/mangas/ModalMangas';
import TabAnimes from './screens/animes/TabAnimes';
import ModalAnimes from './screens/animes/ModaAnimes';

export default function Navigation({colorScheme}: { colorScheme: ColorSchemeName }) {
    return (
        <NavigationContainer
            theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Navigator/>
        </NavigationContainer>
    );
}

function Navigator() {
    const Stack = createNativeStackNavigator<RootStackParamList>();
    return (
        <Stack.Navigator initialRouteName="Root">
            <Stack.Screen name="Root" component={BottomTabNavigator} options={{headerShown: false}}/>
            <Stack.Screen name="NotFound" component={NotFoundScreen} options={{title: 'Oops!'}}/>
            <Stack.Group screenOptions={{presentation: 'modal'}}>
                <Stack.Screen name="ModalMangas" component={ModalMangas} options={{title: 'Novo Site'}}/>
                <Stack.Screen name="ModalAnimes" component={ModalAnimes} options={{title: 'Novo Site'}}/>
            </Stack.Group>
        </Stack.Navigator>
    );
}
function BottomTabNavigator() {
    const colorScheme = UseColorScheme();
    const BottomTab = createBottomTabNavigator<RootTabParamList>();
    return (
        <BottomTab.Navigator initialRouteName="TabMangas" screenOptions={{tabBarActiveTintColor: Colors[colorScheme].tint}}>
            <BottomTab.Screen
                name="TabMangas"
                component={TabMangas}
                options={({navigation}: RootTabScreenProps<'TabMangas'>) => ({
                    title: 'Mangas',
                    tabBarIcon: ({color}) => <TabBarIconFeather name="book-open" color={color}/>,
                    headerRight: () => (
                        <Pressable
                            onPress={() => navigation.navigate('ModalMangas')}
                            style={({pressed}) => ({
                                opacity: pressed ? 0.5 : 1,
                            })}>
                            <FontAwesome
                                name="info-circle"
                                size={25}
                                color={Colors[colorScheme].text}
                                style={{marginRight: 15}}
                            />
                        </Pressable>
                    ),
                })}
            />
            <BottomTab.Screen
                name="TabAnimes"
                component={TabAnimes}
                options={({navigation}: RootTabScreenProps<'TabAnimes'>) => ({
                    title: 'Animes',
                    tabBarIcon: ({color}) => <TabBarIconFontAwesome name="tv" color={color}/>,
                    headerRight: () => (
                        <Pressable
                            onPress={() => navigation.navigate('ModalAnimes')}
                            style={({pressed}) => ({
                                opacity: pressed ? 0.5 : 1,
                            })}>
                            <FontAwesome
                                name="info-circle"
                                size={25}
                                color={Colors[colorScheme].text}
                                style={{marginRight: 15}}
                            />
                        </Pressable>
                    ),
                })}
            />
        </BottomTab.Navigator>
    );
}