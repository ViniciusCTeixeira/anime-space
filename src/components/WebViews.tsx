import {WebView as ReactNativeWebview} from 'react-native-webview';

import Constants from "expo-constants";

export function WebViews(props: { url: string }) {
    return (
        <ReactNativeWebview
            style={{
                flex: 1,
            }}
            source={{uri: props.url}}
        />
    );
}