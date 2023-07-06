import * as React from "react";
import {ActivityIndicator, TouchableOpacity, View} from "react-native";
import {WebView as ReactNativeWebview} from 'react-native-webview';

import {RootDrawerScreenProps} from "../../../types/ReactNavigation";

export default function WebView({route, navigation}: RootDrawerScreenProps<'Search'>){

    const searchScript = `
            const createButton = document.createElement('button');
            createButton.innerText = '❤️';
            createButton.style.position = 'fixed';
            createButton.style.bottom = '20px';
            createButton.style.right = '30px';
            createButton.style.zIndex = '9999';
            createButton.style.border = 'none';
            createButton.style.outline = 'none';
            createButton.style.backgroundColor = 'rgba(60, 60, 60, 0.5)';
            createButton.style.color = 'white';
            createButton.style.padding = '10px';
            createButton.style.borderRadius = '10px';
            createButton.style.fontSize = '25px';
            
            createButton.addEventListener('click', function handleClick(event) {
                var dummy = document.createElement('input'),
                text = window.location.href;
                document.body.appendChild(dummy);
                dummy.value = text;
                dummy.select();
                if(document.execCommand('copy')){
                    window.ReactNativeWebView.postMessage(JSON.stringify({type: 1, msg : "URL copied successfully"}));
                }else{
                    window.ReactNativeWebView.postMessage(JSON.stringify({type: 1, msg : "Unable to copy URL"}));
                }
                document.body.removeChild(dummy);
            });
            
            document.body.appendChild(createButton);
            true;
        `;

    return (
        <>
            <ReactNativeWebview
                style={{flex: 1}}
                source={{uri: "https://www.google.com/"}}
                injectedJavaScript={searchScript}
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