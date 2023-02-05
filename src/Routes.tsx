import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {DarkTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {RootStackParamList, RootTabParamList, RootTabScreenProps} from '../types/ReactNavigation';

import NotFound from './screens/NotFound';
import Mangas from './screens/Mangas';
import SiteInfo from "./screens/SiteInfo";
import Animes from './screens/Animes';
import AddSite from "./screens/AddSite";
import {Pressable, View} from "react-native";
import {Feather, FontAwesome} from "@expo/vector-icons";
import WebView from "./screens/WebView";


export default function Navigation() {
    return (
        <NavigationContainer theme={DarkTheme}>
            <Navigator/>
        </NavigationContainer>
    );
}

function Navigator() {
    const Stack = createNativeStackNavigator<RootStackParamList>();

    return (
        <Stack.Navigator initialRouteName="Root">
            <Stack.Screen name="Root" component={BottomTabNavigator} options={{headerShown: false}}/>
            <Stack.Group screenOptions={{presentation: 'modal'}}>
                <Stack.Screen name="SiteInfo" component={SiteInfo} options={{title: 'Website Infos'}}/>
                <Stack.Screen name="AddSite" component={AddSite} options={{title: 'Add Website'}}/>
                <Stack.Screen name="WebView" component={WebView} options={({ route }) => ({ title: route.params.title })}/>
            </Stack.Group>
            <Stack.Screen name="NotFound" component={NotFound} options={{title: 'Oops!'}}/>
        </Stack.Navigator>
    );
}

function BottomTabNavigator() {
    const BottomTab = createBottomTabNavigator<RootTabParamList>();

    return (
        <BottomTab.Navigator initialRouteName="Mangas" screenOptions={{
            tabBarActiveTintColor: "#42a5f5",
            tabBarInactiveTintColor: "rgba(255, 255, 255, 0.3)"
        }}>
            <BottomTab.Screen
                name="Mangas"
                component={Mangas}
                options={({navigation}: RootTabScreenProps<'Mangas'>) => ({
                    title: 'Mangas',
                    headerTitleStyle: {color: "#fff"},
                    tabBarIcon: ({color}) => <Feather size={30} style={{marginBottom: -3}} name="book-open" color={color}/>,
                    tabBarStyle: {paddingBottom: 5},
                    headerRight: () => (
                        <View style={{flexDirection: "row"}}>
                            <Pressable
                                onPress={() => navigation.navigate({name: 'WebView', params: {url: "https://www.google.com/", title: "Search"}})}
                                style={({pressed}) => ({
                                    opacity: pressed ? 0.5 : 1,
                                    marginRight: 10
                                })}>
                                <FontAwesome
                                    name="search"
                                    size={25}
                                    color={"#fff"}
                                    style={{marginRight: 15}}
                                />
                            </Pressable>
                            <Pressable
                                onPress={() => navigation.navigate('AddSite')}
                                style={({pressed}) => ({
                                    opacity: pressed ? 0.5 : 1,
                                })}>
                                <FontAwesome
                                    name="plus-circle"
                                    size={25}
                                    color={"#fff"}
                                    style={{marginRight: 15}}
                                />
                            </Pressable>
                        </View>
                    ),
                })}
            />
            <BottomTab.Screen
                name="Animes"
                component={Animes}
                options={({navigation}: RootTabScreenProps<'Animes'>) => ({
                    title: 'Animes',
                    headerTitleStyle: {color: "#fff"},
                    tabBarIcon: ({color}) => <FontAwesome size={30} style={{marginBottom: -3}} name="tv" color={color}/>,
                    tabBarStyle: {paddingBottom: 5},
                    headerRight: () => (
                        <View style={{flexDirection: "row"}}>
                            <Pressable
                                onPress={() => navigation.navigate({name: 'WebView', params: {url: "https://www.google.com/", title: "Search"}})}
                                style={({pressed}) => ({
                                    opacity: pressed ? 0.5 : 1,
                                    marginRight: 10
                                })}>
                                <FontAwesome
                                    name="search"
                                    size={25}
                                    color={"#fff"}
                                    style={{marginRight: 15}}
                                />
                            </Pressable>
                            <Pressable
                                onPress={() => navigation.navigate('AddSite')}
                                style={({pressed}) => ({
                                    opacity: pressed ? 0.5 : 1,
                                })}>
                                <FontAwesome
                                    name="plus-circle"
                                    size={25}
                                    color={"#fff"}
                                    style={{marginRight: 15}}
                                />
                            </Pressable>
                        </View>
                    ),
                })}
            />
        </BottomTab.Navigator>
    );
}