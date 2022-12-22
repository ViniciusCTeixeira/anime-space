import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import { WebView } from 'react-native-webview';

export default function TabTwoScreen() {
  return (
      <WebView
          style={styles.container}
          source={{ uri: 'https://expo.dev' }}
      />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
});
