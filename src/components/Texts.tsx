import {Text as DefaultText} from "react-native";
import {UseThemeColor} from "../../resources/UseThemeColor";

import {TextProps} from "../../types/Themes";

export function Text(props: TextProps) {
  const {style, lightColor, darkColor, colorName, ...others} = props;
  const color = UseThemeColor({ light: lightColor, dark: darkColor, colorName: colorName });

  return <DefaultText style={[{color: color}, style]} {...others} />;
}

export function MonoText(props: TextProps) {
  const {style, ...others} = props;

  return <Text style={[{fontFamily: 'space-mono'}, style]} {...others} />;
}
