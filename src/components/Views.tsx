import {ActivityIndicator, View as DefaultView} from "react-native";
import {GetThemeColors, UseThemeColor} from "../../resources/UseThemeColor";

import {ViewStyle} from "../../assets/styles";

import {ViewProps} from "../../types/Themes";

export function View(props: ViewProps) {
    const {style, lightColor, darkColor, colorName, ...others} = props;
    const backgroundColor = UseThemeColor({ light: lightColor, dark: darkColor, colorName: colorName });

    return <DefaultView style={[{backgroundColor: backgroundColor}, style]} {...others} />;
}

export function Container(props: ViewProps) {
    const {style, ...others} = props;

    return <View style={[ViewStyle.container, style]} {...others} />;
}

export function Separator(props: ViewProps) {
    const {style, ...others} = props;

    return <View style={[ViewStyle.separator, style]} {...others} />;
}

export function Loading(props: ViewProps) {
    const theme = GetThemeColors();
    const {style, ...others} = props;
    return <View style={[{flex: 1, justifyContent: "center", flexDirection: "row", padding: 10}, style]} {...others} >
        <ActivityIndicator size="large" color={theme.colors.secondary}/>
    </View>
}