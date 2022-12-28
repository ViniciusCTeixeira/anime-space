import { ColorSchemeName, useColorScheme as _useColorScheme } from 'react-native';
import {ThemesColorsProps} from "../types/Themes";
import {lightTheme, darkTheme} from "./Themes";

export function UseColorScheme(): NonNullable<ColorSchemeName> {
    return _useColorScheme() as NonNullable<ColorSchemeName>;
}

export function UseThemeColor(props: { light?: string; dark?: string, colorName: keyof ThemesColorsProps['colors'] | undefined}) {
    const theme = UseColorScheme();
    const themeColors = theme === 'dark' ? darkTheme : lightTheme;

    if(props[theme]){
        return props[theme];
    }

    if(props.colorName){
        return themeColors.colors[props.colorName]
    }

    return 'none';
}

export function GetThemeColors(){
    const theme = UseColorScheme();
    return theme === 'dark' ? darkTheme : lightTheme;
}