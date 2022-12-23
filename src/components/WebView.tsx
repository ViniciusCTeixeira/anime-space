import { WebView as ReactNativeWebview } from 'react-native-webview';
import { StyleSheet } from 'react-native';

import Constants from "expo-constants";

export default function WebView({ path }: { path: string }) {
  return (
      <ReactNativeWebview
          style={styles.container}
          source={{ uri: path }}
      />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
});