import {TextInput as DefaultTextInput} from "react-native";
import {Picker as DefaultPicker} from '@react-native-picker/picker';
import {UseThemeColor} from "../../resources/UseThemeColor";

import {TextInputProps, PickerProps} from "../../types/Themes";

export function TextInput(props: TextInputProps) {
    const {style, lightColor, darkColor, colorName, ...others} = props;
    const backgroundColor = UseThemeColor({light: lightColor, dark: darkColor, colorName: colorName});

    return <DefaultTextInput style={[{backgroundColor: backgroundColor}, style]} {...others}/>
}

export function Picker(props: PickerProps) {
    const {style, lightColor, darkColor, colorName, ...others} = props;
    const backgroundColor = UseThemeColor({light: lightColor, dark: darkColor, colorName: colorName});

    return <DefaultPicker style={[{backgroundColor: backgroundColor}, style]} {...others}/>
}
