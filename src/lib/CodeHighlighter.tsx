import React, { type FunctionComponent, type ReactNode, useMemo } from "react";
import {
	ScrollView,
	type ScrollViewProps,
	type StyleProp,
	StyleSheet,
	Text,
	type TextStyle,
	View,
	type ViewStyle,
} from "react-native";
import SyntaxHighlighter, {
	type SyntaxHighlighterProps,
} from "react-syntax-highlighter";
import { trimNewlines } from "trim-newlines";
import {
	type HighlighterStyleSheet,
	type ReactStyle,
	getRNStylesFromHljsStyle,
} from "./../utils/styles";

export interface CodeHighlighterProps extends SyntaxHighlighterProps {
	hljsStyle: ReactStyle;
	textStyle?: StyleProp<TextStyle>;
	scrollViewProps?: ScrollViewProps;
	/**
	 * @deprecated Use scrollViewProps.contentContainerStyle instead
	 */
	containerStyle?: StyleProp<ViewStyle>;
}

export const CodeHighlighter: FunctionComponent<CodeHighlighterProps> = ({
	children,
	textStyle,
	hljsStyle,
	scrollViewProps,
	containerStyle,
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
				{...scrollViewProps}
				horizontal
				contentContainerStyle={[
					stylesheet.hljs,
					scrollViewProps?.contentContainerStyle,
					containerStyle,
				]}
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
