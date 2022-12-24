import {Text as DefaultText} from "react-native";
import {ThemeProps} from "../resources/types/ThemesType";
import {UseThemeColor} from "../services/ThemeColorService";

export type TextProps = ThemeProps & DefaultText['props'];
export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = UseThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}
export function MonoText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'space-mono' }]} />;
}
