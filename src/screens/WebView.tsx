import * as React from "react";
import {WebViews} from "../components/WebViews";

import {RootStackScreenProps} from "../../types/ReactNavigation";

export default function WebView({route, navigation}: RootStackScreenProps<'WebView'>){
    return (
        <WebViews url={route.params.url}/>
    )
}