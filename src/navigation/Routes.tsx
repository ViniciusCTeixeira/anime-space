import * as React from 'react';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParamList, RootDrawerParamList } from '../../types/ReactNavigation';

import CustomDrawerContent from "./Menu";

import NotFound from '../screens/NotFound';
import Mangas from '../screens/Mangas/Mangas';
import Animes from '../screens/Animes/Animes';
import AddMangas from "../screens/Mangas/AddMangas";
import AddAnimes from "../screens/Animes/AddAnimes";
import WebView from "../screens/Pages/WebView";
import Search from "../screens/Pages/Search";
import Home from "../screens/Pages/Home";

import { Pressable, View } from "react-native";
import { Feather, FontAwesome } from "@expo/vector-icons";


export default function Navigation() {
    const Stack = createNativeStackNavigator<RootStackParamList>();
    return (
        <Navigator />
    );
}

function Navigator() {
    const Stack = createNativeStackNavigator<RootStackParamList>();

    return (
        <Stack.Navigator initialRouteName="Root">
            <Stack.Screen name="Root" component={DrawerNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="AddAnimes" component={AddAnimes} options={{ title: 'Add Animes' }} />
            <Stack.Screen name="AddMangas" component={AddMangas} options={{ title: 'Add Mangas' }} />
            <Stack.Screen name="WebView" component={WebView} options={({ route }) => ({ title: route.params.title })} />
            <Stack.Screen name="NotFound" component={NotFound} options={{ title: 'Oops!' }} />
        </Stack.Navigator>
    );
}

function DrawerNavigator() {
    const Drawer = createDrawerNavigator<RootDrawerParamList>();

    return (
        <Drawer.Navigator
            style={{ flex: 1 }}
            drawerContent={(props) => (
                <CustomDrawerContent {...props} profile={profile} />
            )}
            drawerStyle={{
                backgroundColor: "white",
                width: width * 0.8,
            }}
            drawerContentOptions={{
                activeTintColor: "white",
                inactiveTintColor: "#000",
                activeBackgroundColor: materialTheme.COLORS.ACTIVE,
                inactiveBackgroundColor: "transparent",
                itemStyle: {
                    width: width * 0.74,
                    paddingHorizontal: 12,
                    // paddingVertical: 4,
                    justifyContent: "center",
                    alignContent: "center",
                    // alignItems: 'center',
                    overflow: "hidden",
                },
                labelStyle: {
                    fontSize: 18,
                    fontWeight: "normal",
                },
            }}
            initialRouteName="Home"
        >
            <Drawer.Screen
                name="Home"
                component={Home}
                options={{
                    drawerIcon: ({ focused }) => (
                        <Icon
                            size={16}
                            name="shop"
                            family="GalioExtra"
                            color={focused ? "white" : materialTheme.COLORS.MUTED}
                        />
                    ),
                }}
            />
            <Drawer.Screen
                name="Mangas"
                component={Mangas}
                options={{
                    drawerIcon: ({ focused }) => (
                        <Icon
                            size={16}
                            name="md-woman"
                            family="ionicon"
                            color={focused ? "white" : materialTheme.COLORS.MUTED}
                            style={{ marginLeft: 4, marginRight: 4 }}
                        />
                    ),
                }}
            />
            <Drawer.Screen
                name="Animes"
                component={Animes}
                options={{
                    drawerIcon: ({ focused }) => (
                        <Icon
                            size={16}
                            name="man"
                            family="entypo"
                            color={focused ? "white" : materialTheme.COLORS.MUTED}
                        />
                    ),
                }}
            />
            <Drawer.Screen
                name="Search"
                component={Search}
                options={{
                    drawerIcon: ({ focused }) => (
                        <Icon
                            size={16}
                            name="man"
                            family="entypo"
                            color={focused ? "white" : materialTheme.COLORS.MUTED}
                        />
                    ),
                }}
            />
        </Drawer.Navigator>
    );
}

function BottomTabNavigator() {
    const BottomTab = createBottomTabNavigator<RootTabParamList>();
    const HeaderRight = (navigation: any, page: 1 | 2) => {
        
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