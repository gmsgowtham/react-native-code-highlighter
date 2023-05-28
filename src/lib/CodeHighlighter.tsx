import React, { useMemo, type FunctionComponent, type ReactNode } from "react";
import {
  Text,
  View,
  useColorScheme,
  ScrollView,
  type ViewStyle,
  type TextStyle,
} from "react-native";
import {
  type SyntaxHighlighterProps,
} from "react-syntax-highlighter";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import {
  stackoverflowLight as lightStyle,
  stackoverflowDark as darkStyle,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import transform, { type StyleTuple } from "css-to-react-native";

type HighlighterStyleSheet = { [key: string]: TextStyle };

interface CodeHighlighterProps extends Partial<SyntaxHighlighterProps> {
  code: string | string[];
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
}

export const CodeHighlighter: FunctionComponent<CodeHighlighterProps> = ({
  code,
  containerStyle,
  textStyle,
  ...rest
}) => {
  const colorScheme = useColorScheme();

  const cleanStyle = (style: React.CSSProperties) => {
    const styles = Object.entries(style).map<StyleTuple>(([key, value]) => [
      key,
      value,
    ]);

    return transform(styles);
  };

  const hlsStyles = useMemo(
    () => (colorScheme === "light" ? lightStyle : darkStyle),
    [colorScheme],
  );

  const stylesheet: HighlighterStyleSheet = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(hlsStyles).map(([className, style]) => [
          className,
          cleanStyle(style),
        ]),
      ),
    [hlsStyles],
  );

  const renderNode = (nodes: rendererNode[], keyPrefix = "row") =>
    nodes.reduce<ReactNode[]>((acc, node, index) => {
      const keyPrefixWithIndex = `${keyPrefix}_${index}`;
      if (node.children) {
        const styles = [
          { color: stylesheet.hljs?.color, ...textStyle }, // default style for fallback
          ...(node.properties?.className || [])
            .map((c) => stylesheet[c])
            .filter((c) => !!c), // fetch styles from element class name
        ];
        acc.push(
          <Text style={styles} key={keyPrefixWithIndex}>
            {renderNode(node.children, `${keyPrefixWithIndex}_child`)}
          </Text>,
        );
      }

      if (node.value) {
        acc.push(<Text key={keyPrefixWithIndex}>{node.value}</Text>);
      }

      return acc;
    }, []);

  const nativeRenderer = (props: rendererProps) => {
    const { rows } = props;
    return (
      <ScrollView horizontal contentContainerStyle={containerStyle}>
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
      {code}
    </SyntaxHighlighter>
  );
};

export default CodeHighlighter;
