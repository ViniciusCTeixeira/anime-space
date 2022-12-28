import {View as DefaultView} from "react-native";
import {UseThemeColor} from "../../resources/UseThemeColor";

import {ViewStyle, ToolsStyle} from "../../assets/styles";

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

    return <View style={[ToolsStyle.separator, style]} {...others} />;
}