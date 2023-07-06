import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParamList, RootDrawerParamList, RootTabScreenProps } from '../types/ReactNavigation';

import NotFound from './screens/NotFound';
import Mangas from './screens/Mangas/Mangas';
import Animes from './screens/Animes/Animes';
import AddMangas from "./screens/Mangas/AddMangas";
import AddAnimes from "./screens/Animes/AddAnimes";
import { Pressable, View } from "react-native";
import { Feather, FontAwesome } from "@expo/vector-icons";
import WebView from "./screens/WebView";
import Root from "./screens/Root";


export default function Navigation() {
    const Stack = createNativeStackNavigator<RootStackParamList>();
    return (
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Root">
            <Stack.Screen
                name="Root"
                component={Root}
                option={{
                    headerTransparent: true,
                }}
            />
            <Stack.Screen name="App" component={AppStack} />
        </Stack.Navigator>
    );
}

function Navigator() {
    const Stack = createNativeStackNavigator<RootStackParamList>();

    return (
        <Stack.Navigator initialRouteName="Root">
            <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="AddAnimes" component={AddAnimes} options={{ title: 'Add Animes' }} />
            <Stack.Screen name="AddMangas" component={AddMangas} options={{ title: 'Add Mangas' }} />
            <Stack.Screen name="WebView" component={WebView} options={({ route }) => ({ title: route.params.title })} />
            <Stack.Screen name="NotFound" component={NotFound} options={{ title: 'Oops!' }} />
        </Stack.Navigator>
    );
}

function BottomTabNavigator() {
    const BottomTab = createBottomTabNavigator<RootTabParamList>();
    const HeaderRight = (navigation: any, page: 1 | 2) => {
        const script = `
            const createButton = document.createElement('button');
            createButton.innerText = '❤️';
            createButton.style.position = 'fixed';
            createButton.style.bottom = '20px';
            createButton.style.right = '30px';
            createButton.style.zIndex = '9999';
            createButton.style.border = 'none';
            createButton.style.outline = 'none';
            createButton.style.backgroundColor = 'rgba(60, 60, 60, 0.5)';
            createButton.style.color = 'white';
            createButton.style.padding = '10px';
            createButton.style.borderRadius = '10px';
            createButton.style.fontSize = '25px';
            
            createButton.addEventListener('click', function handleClick(event) {
                var dummy = document.createElement('input'),
                text = window.location.href;
                document.body.appendChild(dummy);
                dummy.value = text;
                dummy.select();
                if(document.execCommand('copy')){
                    window.ReactNativeWebView.postMessage(JSON.stringify({type: 1, msg : "URL copied successfully"}));
                }else{
                    window.ReactNativeWebView.postMessage(JSON.stringify({type: 1, msg : "Unable to copy URL"}));
                }
                document.body.removeChild(dummy);
            });
            
            document.body.appendChild(createButton);
            true;
        `;
        return (
            <View style={{ flexDirection: "row" }}>
                <Pressable
                    onPress={() => navigation.navigate({ name: 'WebView', params: { url: "https://www.google.com/", title: "Search", script: script } })}
                    style={({ pressed }) => ({
                        opacity: pressed ? 0.5 : 1,
                        marginRight: 10
                    })}>
                    <FontAwesome
                        name="search"
                        size={25}
                        color={"#fff"}
                        style={{ marginRight: 15 }}
                    />
                </Pressable>
                <Pressable
                    onPress={() => (page == 1 ? navigation.navigate('AddMangas') : navigation.navigate('AddAnimes'))}
                    style={({ pressed }) => ({
                        opacity: pressed ? 0.5 : 1,
                    })}>
                    <FontAwesome
                        name="plus-circle"
                        size={25}
                        color={"#fff"}
                        style={{ marginRight: 15 }}
                    />
                </Pressable>
            </View>
        );
    }

    return (
        <BottomTab.Navigator initialRouteName="Mangas" screenOptions={{
            tabBarActiveTintColor: "#42a5f5",
            tabBarInactiveTintColor: "rgba(255, 255, 255, 0.3)"
        }}>
            <BottomTab.Screen
                name="Mangas"
                component={Mangas}
                options={({ navigation }: RootTabScreenProps<'Mangas'>) => ({
                    title: 'Mangas',
                    headerTitleStyle: { color: "#fff" },
                    tabBarIcon: ({ color }) => <Feather size={30} style={{ marginBottom: -3 }} name="book-open" color={color} />,
                    tabBarStyle: { paddingBottom: 5 },
                    headerRight: () => HeaderRight(navigation, 1)
                })}
            />
            <BottomTab.Screen
                name="Animes"
                component={Animes}
                options={({ navigation }: RootTabScreenProps<'Animes'>) => ({
                    title: 'Animes',
                    headerTitleStyle: { color: "#fff" },
                    tabBarIcon: ({ color }) => <FontAwesome size={30} style={{ marginBottom: -3 }} name="tv" color={color} />,
                    tabBarStyle: { paddingBottom: 5 },
                    headerRight: () => HeaderRight(navigation, 2)
                })}
            />
        </BottomTab.Navigator>
    );
}