import {TextInput as DefaultTextInput } from "react-native";
import {UseThemeColor} from "../../resources/UseThemeColor";

import {TextInputProps} from "../../types/Themes";

export function TextInput(props: TextInputProps) {
    const {style, lightColor, darkColor, colorName, ...others} = props;
    const backgroundColor = UseThemeColor({light: lightColor, dark: darkColor, colorName: colorName});

    return <DefaultTextInput style={[{backgroundColor: backgroundColor}, style]} {...others}/>
}
