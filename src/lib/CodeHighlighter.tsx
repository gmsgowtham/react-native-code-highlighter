import React, { useMemo, type FunctionComponent, type ReactNode } from "react";
import {
	Text,
	View,
	ScrollView,
	type ViewStyle,
	type TextStyle,
	type StyleProp,
	StyleSheet,
} from "react-native";
import SyntaxHighlighter, {
	type SyntaxHighlighterProps,
} from "react-syntax-highlighter";
import { trimNewlines } from "trim-newlines";
import {
	getRNStylesFromHljsStyle,
	type HighlighterStyleSheet,
	type ReactStyle,
} from "./../utils/styles";

export interface CodeHighlighterProps extends SyntaxHighlighterProps {
	hljsStyle: ReactStyle;
	containerStyle?: StyleProp<ViewStyle>;
	textStyle?: StyleProp<TextStyle>;
}

export const CodeHighlighter: FunctionComponent<CodeHighlighterProps> = ({
	children,
	containerStyle,
	textStyle,
	hljsStyle,
	...rest
}) => {
	const stylesheet: HighlighterStyleSheet = useMemo(
		() => getRNStylesFromHljsStyle(hljsStyle),
		[hljsStyle],
	);

	const getStylesForNode = (node: rendererNode): TextStyle[] => {
		const classes: string[] = node.properties?.className ?? [];
		return classes
			.map((c: string) => stylesheet[c])
			.filter((c) => !!c) as TextStyle[];
	};

	const renderNode = (nodes: rendererNode[], keyPrefix = "row") =>
		nodes.reduce<ReactNode[]>((acc, node, index) => {
			const keyPrefixWithIndex = `${keyPrefix}_${index}`;
			if (node.children) {
				const styles = StyleSheet.flatten([
					textStyle,
					{ color: stylesheet.hljs?.color },
					getStylesForNode(node),
				]);
				acc.push(
					<Text style={styles} key={keyPrefixWithIndex}>
						{renderNode(node.children, `${keyPrefixWithIndex}_child`)}
					</Text>,
				);
			}

			if (node.value) {
				acc.push(trimNewlines(String(node.value)));
			}

			return acc;
		}, []);

	const renderer = (props: rendererProps) => {
		const { rows } = props;
		return (
			<ScrollView
				horizontal
				contentContainerStyle={[stylesheet.hljs, containerStyle]}
			>
				<View>{renderNode(rows)}</View>
			</ScrollView>
		);
	};

	return (
		<SyntaxHighlighter
			{...rest}
			renderer={renderer}
			CodeTag={View}
			PreTag={View}
			style={{}}
			testID="react-native-code-highlighter"
		>
			{children}
		</SyntaxHighlighter>
	);
};

export default CodeHighlighter;
