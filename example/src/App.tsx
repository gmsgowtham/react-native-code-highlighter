import * as React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CodeHighlighter from "react-native-code-highlighter";
import { darcula as hljsStyle } from "react-syntax-highlighter/dist/esm/styles/hljs";

const CODE_STR = `
import * as React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CodeHighlighter from "react-native-code-highlighter";
import { darcula as hljsStyle } from "react-syntax-highlighter/dist/esm/styles/hljs";
import React, {
	useMemo,
	type FunctionComponent,
	type ReactNode,
	type CSSProperties,
} from "react";
import {
	Text,
	View,
	ScrollView,
	type ViewStyle,
	type TextStyle,
} from "react-native";
import SyntaxHighlighter, {
	type SyntaxHighlighterProps,
} from "react-syntax-highlighter";
// import { trimNewlines } from "trim-newlines";
import {
	getRNStylesFromHljsStyle,
	type HighlighterStyleSheet,
} from "./../utils/styles";
`;

export default function App() {
	return (
		<SafeAreaView>
			<CodeHighlighter
				containerStyle={styles.codeContainer}
				hljsStyle={hljsStyle}
				language="typescript"
			>
				{CODE_STR}
			</CodeHighlighter>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	codeContainer: {
		paddingHorizontal: 16,
		minWidth: "100%",
	},
});
