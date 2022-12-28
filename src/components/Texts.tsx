import {Text as DefaultText} from "react-native";
import {UseThemeColor} from "../../resources/UseThemeColor";

import {TextProps} from "../../types/Themes";

export function Text(props: TextProps) {
  const color = UseThemeColor({ light: props.lightColor, dark: props.darkColor }, 'text');

  return <DefaultText style={[{color}, props.style]} {...props} />;
}

export function MonoText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'space-mono'}]} />;
}
