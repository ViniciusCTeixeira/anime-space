import { ColorSchemeName, useColorScheme as _useColorScheme } from 'react-native';

import Colors from "../resources/constants/ColorsConstant";

export function UseColorScheme(): NonNullable<ColorSchemeName> {
    return _useColorScheme() as NonNullable<ColorSchemeName>;
}

export function UseThemeColor(props: { light?: string; dark?: string }, colorName: keyof typeof Colors.light & keyof typeof Colors.dark) {
    const theme = UseColorScheme();
    const colorFromProps = props[theme];

    if (colorFromProps) {
        return colorFromProps;
    } else {
        return Colors[theme][colorName];
    }
}
