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
import { trimNewlines } from "trim-newlines";
import {
	getRNStylesFromHljsStyle,
	type HighlighterStyleSheet,
} from "./../utils/styles";

export interface CodeHighlighterProps extends SyntaxHighlighterProps {
	hljsStyle: Record<string, CSSProperties>;
	containerStyle?: ViewStyle;
	textStyle?: TextStyle;
}

export const CodeHighlighter: FunctionComponent<CodeHighlighterProps> = ({
	children,
	containerStyle,
	textStyle,
	hljsStyle = {},
	...rest
}) => {
	const stylesheet: HighlighterStyleSheet = useMemo(
		() => getRNStylesFromHljsStyle(hljsStyle),
		[hljsStyle],
	);

	const getStylesForNode = (node: rendererNode): TextStyle[] => {
		const classes: string[] = node.properties?.className || [];
		return classes
			.map<TextStyle | undefined>((c: string) => stylesheet[c])
			.filter((c) => !!c) as TextStyle[];
	};

	const renderNode = (nodes: rendererNode[], keyPrefix = "row") =>
		nodes.reduce<ReactNode[]>((acc, node, index) => {
			const keyPrefixWithIndex = `${keyPrefix}_${index}`;
			if (node.children) {
				const styles = [
					{ ...textStyle, color: stylesheet.hljs?.color },
					getStylesForNode(node),
				];
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

	const nativeRenderer = (props: rendererProps) => {
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
			renderer={nativeRenderer}
			CodeTag={View}
			PreTag={View}
			style={{}}
		>
			{children}
		</SyntaxHighlighter>
	);
};

export default CodeHighlighter;
