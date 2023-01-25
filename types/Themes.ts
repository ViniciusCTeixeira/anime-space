import {Text, View, TextInput} from "react-native";
import {Picker} from '@react-native-picker/picker';

export type ThemeProps = {
    lightColor?: string;
    darkColor?: string;
    colorName?: keyof ThemesColorsProps['colors'];
};

export type ThemesColorsProps = {
    dark: boolean,
    colors: {
        primary: string,
        secondary: string,
        error: string,
        warning: string,
        info: string,
        success: string,
        disabled : string,
        background: string,
        backgroundPaper: string,
        backgroundPaper2 : string,
        textPrimary: string,
        textSecondary: string,
        textDisabled: string,
        buttonActive : string,
        buttonHover : string,
        buttonSelected : string,
        divider: string
    }
};

export type TextProps = ThemeProps & Text['props'];

export type ViewProps = ThemeProps & View['props'];

export type TextInputProps = ThemeProps & TextInput['props'];

export type PickerProps = ThemeProps & Picker<any>['props'];