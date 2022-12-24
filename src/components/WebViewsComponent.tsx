import { WebView as ReactNativeWebview } from 'react-native-webview';
import {GeneralStyle} from "../../assets/styles";

export function WebView({ path }: { path: string }) {
  return (
      <ReactNativeWebview
          style={GeneralStyle.webViewContainer}
          source={{ uri: path }}
      />
  );
}