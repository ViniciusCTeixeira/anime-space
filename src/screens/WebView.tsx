import * as React from "react";
import {ActivityIndicator, TouchableOpacity, View} from "react-native";
import {WebView as ReactNativeWebview} from 'react-native-webview';

import {RootStackScreenProps} from "../../types/ReactNavigation";

export default function WebView({route, navigation}: RootStackScreenProps<'WebView'>){
    const script = route.params.script ?? ``;

    return (
        <>
            <ReactNativeWebview
                style={{flex: 1}}
                source={{uri: route.params.url}}
                injectedJavaScript={script}
                startInLoadingState={true}
                renderLoading={() => (
                    <ActivityIndicator
                        color='black'
                        size='large'
                        style={{flex: 1}}
                    />
                )}
                onMessage={(event) => {
                    const data = JSON.parse(event.nativeEvent.data);
                    if(data.type == 1){
                        alert(data.msg);
                    }
                }}
                allowsBackForwardNavigationGestures={true}
            />
        </>
    )
}