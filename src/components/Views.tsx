import {View as DefaultView} from "react-native";

export function Container(props: DefaultView['props']) {
    const {style, ...others} = props;

    return <DefaultView style={[{flex: 1, borderRadius: 10, padding: 10, flexDirection: "column"}, style]} {...others} />;
}

export function Paper(props: DefaultView['props']) {
    const {style, ...others} = props;

    return <DefaultView style={[{flex: 1, borderRadius: 10, padding: 10, flexDirection: "column", backgroundColor: "rgba(79,79,79,0.5)"}, style]} {...others} />;
}

export function Divider(props: DefaultView['props']) {
    const {style, ...others} = props;

    return <DefaultView style={[{borderBottomColor: 'white', borderBottomWidth: 1, marginVertical: 5}, style]} {...others} />;
}