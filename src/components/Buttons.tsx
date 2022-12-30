import {TouchableOpacity as DefaultTouchableOpacity} from "react-native";
import {UseThemeColor} from "../../resources/UseThemeColor";

import {ThemeProps} from "../../types/Themes";

export function TouchableOpacity(props: ThemeProps & DefaultTouchableOpacity['props']) {
    const {style, lightColor, darkColor, colorName, ...others} = props;
    const backgroundColor = UseThemeColor({ light: lightColor, dark: darkColor, colorName: colorName });

    return <TouchableOpacity style={[{backgroundColor: backgroundColor}, style]} {...others}/>
}

export function PagesTouchableOpacity(props: ThemeProps & DefaultTouchableOpacity['props']) {
    const {style, ...others} = props;

    return <TouchableOpacity style={[{borderRadius: 50, width: '100%', padding: 10}, style]} {...others}/>
}