import * as React from "react";
import {Dimensions} from "react-native";
import {ActivityIndicator} from 'react-native-paper';
import {WebView as ReactNativeWebview, WebViewNavigation} from 'react-native-webview';

import {RootStackScreenProps} from "../../types/ReactNavigation";
import {useEffect} from "react";

export default function WebView({route, navigation}: RootStackScreenProps<'WebView'>) {
    const script = route.params.script ? route.params.script : ``;
    const ScreenWidth = Dimensions.get("window").width;
    const ScreenHeight = Dimensions.get("window").height;

    const [loading, setLoading] = React.useState<boolean>(false);
    const [adblockRules, setAdblockRules] = React.useState<string[]>([]);
    const [currentUrl, setCurrentUrl] = React.useState<string>(route.params.url);

    const parseEasyListRules = (rulesText: string) => {
        const lines = rulesText.split('\n');
        const blockingRules = lines.filter(line =>
            line.startsWith('||') || line.startsWith('|') || line.startsWith('@@') || line.startsWith('/')
        );

        const rules = blockingRules.map(rule => {
            let domainPath = rule;

            // Remove exception prefix
            if (domainPath.startsWith('@@')) {
                domainPath = domainPath.substring(2);
            }

            // Extract domain or domain path
            const match = domainPath.match(/^(?:\|\|?)([^\/]+)/);
            if (match) {
                domainPath = match[1];
            }

            return domainPath;
        });

        setAdblockRules(rules);
    }

    const shouldBlockRequest = (url: string, rules: string[]) => {
        return rules.some(rule => url.endsWith(rule));
    }

    const adblock = (props: WebViewNavigation) => {
        if (props.url.includes('target="_blank"')) {
            return false;
        }

        if (props.url !== currentUrl) {
            if (shouldBlockRequest(props.url, adblockRules)){
                return false;
            }
        }

        setCurrentUrl(props.url)
        return true;
    };

    useEffect(() => {
        fetch('https://easylist.to/easylist/easylist.txt')
            .then((response) => response.text())
            .then(rulesText => {
                parseEasyListRules(rulesText);
            })
    });

    return (
        <>
            <ReactNativeWebview
                style={{flex: 1}}
                source={{uri: route.params.url}}
                injectedJavaScript={script}
                onLoadStart={() => setLoading(true)}
                onLoadEnd={() => setLoading(false)}
                onShouldStartLoadWithRequest={adblock}
                allowsBackForwardNavigationGestures={true}
            />
            {loading &&
                <ActivityIndicator
                    color='purple'
                    size={100}
                    style={{
                        height: ScreenHeight,
                        width: ScreenWidth,
                        position: "absolute",
                        backgroundColor: "rgba(79,79,79,0.5)"
                    }}
                />
            }
        </>
    )
}