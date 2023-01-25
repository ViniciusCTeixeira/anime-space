import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {DarkTheme, DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {GetThemeColors} from "../resources/UseThemeColor";
import {TabBarIconFeather, TabBarIconFontAwesome} from './components/Icons';

import {RootStackParamList, RootTabParamList, RootTabScreenProps} from '../types/ReactNavigation';

import NotFound from './screens/NotFound';
import Mangas from './screens/Mangas';
import SiteInfo from "./screens/SiteInfo";
import Animes from './screens/Animes';
import AddSite from "./screens/AddSite";
import {Pressable} from "react-native";
import {FontAwesome} from "@expo/vector-icons";


export default function Navigation() {
    const Theme = GetThemeColors();
    return (
        <NavigationContainer theme={Theme.dark ? DarkTheme : DefaultTheme}>
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
                <Stack.Screen name="SiteInfo" component={SiteInfo} options={{title: 'Informações'}}/>
                <Stack.Screen name="AddSite" component={AddSite} options={{title: 'Adicionar'}}/>
            </Stack.Group>
            <Stack.Screen name="NotFound" component={NotFound} options={{title: 'Oops!'}}/>
        </Stack.Navigator>
    );
}

function BottomTabNavigator() {
    const BottomTab = createBottomTabNavigator<RootTabParamList>();
    const Theme = GetThemeColors();

    return (
        <BottomTab.Navigator initialRouteName="Mangas" screenOptions={{tabBarActiveTintColor: Theme.colors.primary, tabBarInactiveTintColor: Theme.colors.disabled}}>
            <BottomTab.Screen
                name="Mangas"
                component={Mangas}
                options={({navigation}: RootTabScreenProps<'Mangas'>) => ({
                    title: 'Mangas',
                    headerTitleStyle: {color: Theme.colors.textPrimary},
                    tabBarIcon: ({color}) => <TabBarIconFeather name="book-open" color={color}/>,
                    tabBarStyle: {paddingBottom: 5},
                    headerRight: () => (
                        <Pressable
                            onPress={() => navigation.navigate('AddSite')}
                            style={({pressed}) => ({
                                opacity: pressed ? 0.5 : 1,
                            })}>
                            <FontAwesome
                                name="plus-circle"
                                size={25}
                                color={Theme.colors.textPrimary}
                                style={{marginRight: 15}}
                            />
                        </Pressable>
                    ),
                })}
            />
            <BottomTab.Screen
                name="Animes"
                component={Animes}
                options={({navigation}: RootTabScreenProps<'Animes'>) => ({
                    title: 'Animes',
                    headerTitleStyle: {color: Theme.colors.textPrimary},
                    tabBarIcon: ({color}) => <TabBarIconFontAwesome name="tv" color={color}/>,
                    tabBarStyle: {paddingBottom: 5},
                    headerRight: () => (
                        <Pressable
                            onPress={() => navigation.navigate('AddSite')}
                            style={({pressed}) => ({
                                opacity: pressed ? 0.5 : 1,
                            })}>
                            <FontAwesome
                                name="plus-circle"
                                size={25}
                                color={Theme.colors.textPrimary}
                                style={{marginRight: 15}}
                            />
                        </Pressable>
                    ),
                })}
            />
        </BottomTab.Navigator>
    );
}