import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {DarkTheme, DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {GetThemeColors} from "../resources/UseThemeColor";
import {TabBarIconFeather, TabBarIconFontAwesome} from './components/Icons';

import {RootStackParamList, RootTabParamList, RootTabScreenProps} from '../types/ReactNavigation';

import NotFound from './screens/NotFound';
import TabMangas from './screens/mangas/TabMangas';
import TabAnimes from './screens/animes/TabAnimes';


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
            <Stack.Screen name="NotFound" component={NotFound} options={{title: 'Oops!'}}/>
        </Stack.Navigator>
    );
}

function BottomTabNavigator() {
    const BottomTab = createBottomTabNavigator<RootTabParamList>();
    const Theme = GetThemeColors();

    return (
        <BottomTab.Navigator initialRouteName="TabMangas" screenOptions={{tabBarActiveTintColor: Theme.colors.primary, tabBarInactiveTintColor: Theme.colors.disabled}}>
            <BottomTab.Screen
                name="TabMangas"
                component={TabMangas}
                options={({navigation}: RootTabScreenProps<'TabMangas'>) => ({
                    title: 'Mangas',
                    headerTitleStyle: {color: Theme.colors.textPrimary},
                    tabBarIcon: ({color}) => <TabBarIconFeather name="book-open" color={color}/>,
                    tabBarStyle: {paddingBottom: 5}
                })}
            />
            <BottomTab.Screen
                name="TabAnimes"
                component={TabAnimes}
                options={({navigation}: RootTabScreenProps<'TabAnimes'>) => ({
                    title: 'Animes',
                    headerTitleStyle: {color: Theme.colors.textPrimary},
                    tabBarIcon: ({color}) => <TabBarIconFontAwesome name="tv" color={color}/>,
                    tabBarStyle: {paddingBottom: 5}
                })}
            />
        </BottomTab.Navigator>
    );
}