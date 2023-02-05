import {View as DefaultView} from "react-native";

export function Container(props: DefaultView['props']) {
    const {style, ...others} = props;

    return <DefaultView style={[{flex: 1, borderRadius: 10, padding: 10}, style]} {...others} />;
}