import {StyleSheet} from "react-native";
import Constants from "expo-constants";

export const GeneralStyle = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    webViewContainer: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
