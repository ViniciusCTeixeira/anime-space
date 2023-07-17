import * as React from "react";
import { Dimensions, ActivityIndicator, View } from "react-native";
import { WebView as ReactNativeWebview } from 'react-native-webview';

import { RootStackScreenProps } from "../../types/ReactNavigation";

export default function WebView({ route, navigation }: RootStackScreenProps<'WebView'>) {
    const script = route.params.script ? route.params.script : ``;
    const ScreenWidth = Dimensions.get("window").width;
    const ScreenHeight = Dimensions.get("window").height;

    const [loading, setLoading] = React.useState<boolean>(false);

    return (
        <>
            <ReactNativeWebview
                style={{ flex: 1 }}
                source={{ uri: route.params.url }}
                injectedJavaScript={script}
                onLoadStart={() => setLoading(true)}
                onLoadEnd={() => setLoading(false)}
                allowsBackForwardNavigationGestures={true}
            />
            {loading &&
                <ActivityIndicator
                    color='purple'
                    size={100}
                    style={{ height: ScreenHeight, width: ScreenWidth, position: "absolute", backgroundColor: "rgba(79,79,79,0.5)" }}
                />
            }
        </>
    )
}