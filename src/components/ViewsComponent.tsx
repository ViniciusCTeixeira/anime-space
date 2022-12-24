import {View as DefaultView} from "react-native";
import {ThemeProps} from "../resources/types/ThemesType";
import {UseThemeColor} from "../services/ThemeColorService";

export type ViewProps = ThemeProps & DefaultView['props'];

export function View(props: ViewProps) {
    const { style, lightColor, darkColor, ...otherProps } = props;
    const backgroundColor = UseThemeColor({ light: lightColor, dark: darkColor }, 'background');

    return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}