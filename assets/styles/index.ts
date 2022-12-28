import {StyleSheet} from "react-native";
import Constants from "expo-constants";

export const ToolsStyle = StyleSheet.create({
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});

export const TextStyle = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export const ViewStyle = StyleSheet.create({
    container: {
        flex: 1,
    },
    boxContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    webViewContainer: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
    },
});