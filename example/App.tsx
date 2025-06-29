import * as React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import CodeHighlighter from "react-native-code-highlighter";
import { SafeAreaView } from "react-native-safe-area-context";
import { atomOneDarkReasonable as hljsStyle } from "react-syntax-highlighter/dist/esm/styles/hljs";

const CODE_STR = `
import React from 'react';
import {SectionList, StyleSheet, Text, View} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

const SectionListBasics = () => {
  return (
    <View style={styles.container}>
      <SectionList
        sections={[
          {title: 'D', data: ['Devin', 'Dan', 'Dominic']},
          {
            title: 'J',
            data: [
              'Jackson',
              'James',
              'Jillian',
              'Jimmy',
              'Joel',
              'John',
              'Julie',
            ],
          },
        ]}
        renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
        renderSectionHeader={({section}) => (
          <Text style={styles.sectionHeader}>{section.title}</Text>
        )}
        keyExtractor={item => \`basicListEntry-$\{item\}\`}
      />
    </View>
  );
};

export default SectionListBasics;
`;

export default function App() {
	return (
		<SafeAreaView>
			<Text>Example from https://reactnative.dev/docs/using-a-listview</Text>
			<ScrollView>
				<CodeHighlighter
					containerStyle={styles.codeContainer}
					textStyle={styles.text}
					hljsStyle={hljsStyle}
					language="typescript"
					scrollViewProps={{
						contentContainerStyle: styles.codeContainer,
					}}
				>
					{CODE_STR}
				</CodeHighlighter>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	codeContainer: {
		paddingHorizontal: 16,
	},
	text: {
		fontSize: 16,
	},
});
