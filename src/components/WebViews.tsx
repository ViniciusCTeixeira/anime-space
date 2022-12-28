import {WebView as ReactNativeWebview} from 'react-native-webview';
import {ViewStyle} from "../../assets/styles";

export function WebView(props: { url: string }) {
    return (
        <ReactNativeWebview
            style={ViewStyle.webViewContainer}
            source={{uri: props.url}}
        />
    );
}