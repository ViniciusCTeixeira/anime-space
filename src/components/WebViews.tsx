import {WebView as ReactNativeWebview} from 'react-native-webview';

import Constants from "expo-constants";

export function WebView(props: { url: string }) {
    return (
        <ReactNativeWebview
            style={{
                flex: 1,
                marginTop: Constants.statusBarHeight,
            }}
            source={{uri: props.url}}
        />
    );
}