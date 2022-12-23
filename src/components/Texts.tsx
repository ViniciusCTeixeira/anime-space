import {Text as DefaultText} from "react-native";
import {ThemeProps, useThemeColor} from "../../resources/useThemeColor";

export type TextProps = ThemeProps & DefaultText['props'];
export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}
export function MonoText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'space-mono' }]} />;
}
