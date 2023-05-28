import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import CodeHighlighter from 'react-native-code-highlighter';

export default function App() {
  return (
    <View style={styles.container}>
      <CodeHighlighter code={`var a = "2342";`} containerStyle={styles.code} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  code: { width: '100%', padding: 8 },
});
