import * as React from 'react';
import 'react-native-gesture-handler';
import { Appbar, Menu, BottomNavigation } from 'react-native-paper';
import { getHeaderTitle } from '@react-navigation/elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Feather } from "@expo/vector-icons";

import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types/ReactNavigation';

import { WebviewSaveLink } from '../resources/constants';

import NotFound from './screens/NotFound';
import Mangas from './screens/Mangas/Mangas';
import Animes from './screens/Animes/Animes';
import WebView from "./screens/WebView";

export default function Navigation(props: {theme: any}) {
    return (
        <NavigationContainer theme={props.theme}>
            <Navigator />
        </NavigationContainer>
    );
}

function Navigator() {
    const Stack = createNativeStackNavigator<RootStackParamList>();

    return (
        <Stack.Navigator initialRouteName="Root" screenOptions={{ header: (props) => <CustomNavigationBar navigation={props.navigation} route={props.route} options={props.options} back={true} />, }}>
            <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="WebView" component={WebView} options={({ route }) => ({ title: route.params.title })} />
            <Stack.Screen name="NotFound" component={NotFound} options={{ title: 'Oops!' }} />
        </Stack.Navigator>
    );
}

function BottomTabNavigator() {
    const BottomTab = createBottomTabNavigator<RootTabParamList>();

    return (
        <BottomTab.Navigator
            initialRouteName="Mangas"
            screenOptions={{tabBarStyle:{height:1}}}
            tabBar={({ navigation, state, descriptors, insets }) => (
                <BottomNavigation.Bar
                    navigationState={state}
                    safeAreaInsets={insets}
                    onTabPress={({ route }) => {
                        navigation.navigate(route.name, route.params)
                    }}
                    renderIcon={({ route, focused, color }) => {
                        const { options: {tabBarIcon} } = descriptors[route.key];
                        if (tabBarIcon) {
                            return tabBarIcon({ focused, color, size: 24 });
                        }

                        return null;
                    }}
                    getLabelText={({ route }) => {
                        const { options } = descriptors[route.key];
                        return getHeaderTitle(options, route.name);
                    }}
                />
            )}
        >
            <BottomTab.Screen
                name="Mangas"
                component={Mangas}
                options={({ navigation }: RootTabScreenProps<'Mangas'>) => ({
                    title: 'Mangas',
                    header: (props) => <CustomNavigationBar navigation={navigation} route={props.route} options={props.options} back={false} />,
                    tabBarIcon: ({ color, size }) => {
                        return <Feather size={size} name="book-open" color={color} />;
                    }
                })}
            />
            <BottomTab.Screen
                name="Animes"
                component={Animes}
                options={({ navigation }: RootTabScreenProps<'Animes'>) => ({
                    title: 'Animes',
                    header: (props) => <CustomNavigationBar navigation={navigation} route={props.route} options={props.options} back={false} />,
                    tabBarIcon: ({ color, size }) => {
                        return <Feather size={size} name="tv" color={color} />;
                    }
                })}
            />
        </BottomTab.Navigator>
    );
}

function CustomNavigationBar(props: { route: any, options: any, navigation: any, back: boolean }) {
    const [visible, setVisible] = React.useState<boolean>(false);
    const title = getHeaderTitle(props.options, props.route.name);

    return (
        <Appbar.Header>
            {props.back ? <Appbar.BackAction onPress={props.navigation.goBack} /> : null}
            <Appbar.Content title={title} />
            {!props.back ? (
                <Menu
                    visible={visible}
                    onDismiss={() => setVisible(false)}
                    anchor={
                        <Appbar.Action
                            icon="dots-vertical"
                            onPress={() => setVisible(true)}
                        />
                    }>
                    <Menu.Item
                        onPress={() => {
                            props.navigation.navigate({ name: 'WebView', params: { url: "https://www.google.com/", title: "Search", script: WebviewSaveLink } })
                            setVisible(false)
                        }}
                        title="Search"
                        leadingIcon="web"
                    />
                    <Menu.Item
                        onPress={() => {
                            console.log('Option 2 was pressed');
                            setVisible(false)
                        }}
                        title="Add"
                        leadingIcon="plus"
                    />
                </Menu>
            ) : null}
        </Appbar.Header>
    );
}