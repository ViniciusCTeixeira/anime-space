import { ColorSchemeName, useColorScheme as _useColorScheme } from 'react-native';

import Themes from "../constants/Themes";

export function UseColorScheme(): NonNullable<ColorSchemeName> {
    return _useColorScheme() as NonNullable<ColorSchemeName>;
}

export function UseThemeColor(props: { light?: string; dark?: string }, colorName: keyof typeof Themes.light.colors & keyof typeof Themes.dark.colors) {
    const theme = UseColorScheme();
    const colorFromProps = props[theme];

    if (colorFromProps) {
        return colorFromProps;
    }

    return Themes[theme].colors[colorName];
}

export function GetThemeColors(){
    const theme = UseColorScheme();
    return Themes[theme];
}