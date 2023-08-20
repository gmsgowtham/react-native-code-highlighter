import CodeHighlighter from "../CodeHighlighter";
import { render, screen } from "@testing-library/react-native";
import { atomOneDarkReasonable as hljsStyle } from "react-syntax-highlighter/dist/esm/styles/hljs";

describe(CodeHighlighter, () => {
	it("render", async () => {
		const code = `const hello = "world"`;
		const r = render(
			<CodeHighlighter hljsStyle={hljsStyle} language="typescript">
				{code}
			</CodeHighlighter>,
		);

		expect(screen.queryByTestId("react-native-code-highlighter")).toBeDefined();
		expect(screen.getByText("const")).toBeDefined();
		expect(screen.getByText("hello =")).toBeDefined();
		expect(screen.getByText('"world"')).toBeDefined();

		const tree = r.toJSON();
		expect(tree).toMatchSnapshot();
	});
	it("render with styles", async () => {
		const code = `
      const hello = "world";
      let foo = "bar";
      `;
		const r = render(
			<CodeHighlighter
				hljsStyle={hljsStyle}
				scrollViewProps={{
					contentContainerStyle: { padding: 8, backgroundColor: "#000" },
				}}
				textStyle={{ color: "#fff", fontSize: 12 }}
				language="javascript"
			>
				{code}
			</CodeHighlighter>,
		);

		expect(screen.queryByTestId("react-native-code-highlighter")).toBeDefined();
		expect(screen.getByText("const")).toBeDefined();
		expect(screen.getByText("hello =")).toBeDefined();
		expect(screen.getByText('"world"')).toBeDefined();
		expect(screen.getByText("let")).toBeDefined();
		expect(screen.getByText("foo =")).toBeDefined();
		expect(screen.getByText('"bar"')).toBeDefined();

		const tree = r.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
