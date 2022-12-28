import {View as DefaultView} from "react-native";
import {UseThemeColor} from "../../resources/ThemesColors";

import {ViewStyle, ToolsStyle} from "../../assets/styles";

import {ViewProps} from "../../types/Themes";

export function View(props: ViewProps) {
    const backgroundColor = UseThemeColor({ light: props.lightColor, dark: props.darkColor }, 'background');

    return <DefaultView style={[{backgroundColor}, props.style]} {...props} />;
}

export function Container(props: ViewProps) {
    return <View {...props} style={[props.style, ViewStyle.container]} />
}

export function Separator(props: ViewProps) {
    return <View {...props} style={[props.style, ToolsStyle.separator]} />
}