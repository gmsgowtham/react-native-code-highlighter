# react-native-code-highlighter

Code/Syntax highlighter for React Native. Inspired by [react-native-syntax-highlighter](https://github.com/conorhastings/react-native-syntax-highlighter), using [react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter)

## Installation

```sh
npm install react-native-code-highlighter
or
yarn add react-native-code-highlighter
```

## Usage

### Props
| Prop                                                                                                        	| Description                                                                      	| Type                                     	| Optional 	|
|-------------------------------------------------------------------------------------------------------------	|----------------------------------------------------------------------------------	|------------------------------------------	|----------	|
| hljsStyle                                                                                                   	| Highlight.js style imported from `react-syntax-highlighter/dist/esm/styles/hljs` 	| `{ [key: string]: React.CSSProperties }` 	| false    	|
| containerStyle                                                                                              	| `containerStyle` for the underlying `ScrollView`                                 	| `StyleProp<br><ViewStyle>`               	| true     	|
| textStyle                                                                                                   	| Style for the text components. Note: `color` property will be overridden         	| `StyleProp<TextStyle>                    	| true     	|
| [react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter) Props 	      | Props from supported by react-syntax-highlighter                       	|                                          	          |          	|


### Example

```tsx
import React from "react";
import { StyleSheet } from "react-native";
import CodeHighlighter from "react-native-code-highlighter";
import { atomOneDarkReasonable } from "react-syntax-highlighter/dist/esm/styles/hljs";

const CODE_STR = `var hello = "world"`;

export default function HighlightComponent() {
	return (
		<CodeHighlighter
			hljsStyle={atomOneDarkReasonable}
			containerStyle={styles.codeContainer}
			textStyle={styles.text}
			language="typescript"
		>
			{CODE_STR}
		</CodeHighlighter>
	);
}

const styles = StyleSheet.create({
	codeContainer: {
		padding: 16,
		minWidth: "100%",
	},
	text: {
		fontSize: 16,
	},
});
```

## Screenshots

![Image](assets/example.png?raw=true 'Image')

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

## Built using
- [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
- [react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter)
- [trim-newlines](https://github.com/sindresorhus/trim-newlines)
- [css-to-react-native](https://github.com/styled-components/css-to-react-native)
