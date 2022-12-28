import {ActivityIndicator} from "react-native";
import { View } from "./Views";

import {ViewProps} from "../../types/Themes";

import {GetThemeColors} from "../../resources/UseThemeColor";

export function Loading(props: ViewProps) {
    const theme = GetThemeColors();
    const {style, ...others} = props;
    return <View style={[{flex: 1, justifyContent: "center", flexDirection: "row", padding: 10}, style]} {...others} >
        <ActivityIndicator size="large" color={theme.colors.secondary}/>
    </View>
}
