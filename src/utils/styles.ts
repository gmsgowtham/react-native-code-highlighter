import transform, { type StyleTuple } from "css-to-react-native";
import type { CSSProperties } from "react";
import type { TextStyle } from "react-native";

export type HighlighterStyleSheet = { [key: string]: TextStyle };
export type ReactStyle = Record<string, CSSProperties>;

const ALLOWED_STYLE_PROPERTIES: Record<string, boolean> = {
	color: true,
	background: true,
	backgroundColor: true,
	fontWeight: true,
	fontStyle: true,
};

export const getRNStylesFromHljsStyle = (
	hljsStyle: ReactStyle,
): HighlighterStyleSheet => {
	return Object.fromEntries(
		Object.entries(hljsStyle).map(([className, style]) => [
			className,
			cleanStyle(style),
		]),
	);
};

export const cleanStyle = (style: CSSProperties) => {
	const styles = Object.entries(style)
		.filter(([key]) => ALLOWED_STYLE_PROPERTIES[key])
		.map<StyleTuple>(([key, value]) => [key, value]);

	return transform(styles);
};
