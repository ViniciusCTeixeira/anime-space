import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {DarkTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {RootStackParamList, RootTabParamList, RootTabScreenProps} from '../types/ReactNavigation';

import NotFound from './screens/NotFound';
import Mangas from './screens/Mangas';
import SiteInfo from "./screens/SiteInfo";
import Animes from './screens/Animes';
import AddSite from "./screens/AddSite";
import {Pressable} from "react-native";
import {Feather, FontAwesome} from "@expo/vector-icons";


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
                <Stack.Screen name="SiteInfo" component={SiteInfo} options={{title: 'Informações'}}/>
                <Stack.Screen name="AddSite" component={AddSite} options={{title: 'Adicionar'}}/>
            </Stack.Group>
            <Stack.Screen name="NotFound" component={NotFound} options={{title: 'Oops!'}}/>
        </Stack.Navigator>
    );
}

function BottomTabNavigator() {
    const BottomTab = createBottomTabNavigator<RootTabParamList>();

    return (
        <BottomTab.Navigator initialRouteName="Mangas" screenOptions={{tabBarActiveTintColor: "#42a5f5", tabBarInactiveTintColor: "rgba(255, 255, 255, 0.3)"}}>
            <BottomTab.Screen
                name="Mangas"
                component={Mangas}
                options={({navigation}: RootTabScreenProps<'Mangas'>) => ({
                    title: 'Mangas',
                    headerTitleStyle: {color: "#fff"},
                    tabBarIcon: ({color}) => <Feather size={30} style={{marginBottom: -3}} name="book-open" color={color}/>,
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
                                color={"#fff"}
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
                    headerTitleStyle: {color: "#fff"},
                    tabBarIcon: ({color}) => <FontAwesome size={30} style={{marginBottom: -3}} name="tv" color={color}/>,
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
                                color={"#fff"}
                                style={{marginRight: 15}}
                            />
                        </Pressable>
                    ),
                })}
            />
        </BottomTab.Navigator>
    );
}