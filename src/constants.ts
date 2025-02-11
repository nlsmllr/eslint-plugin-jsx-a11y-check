/** Short version of the plugin name */
export const PLUGIN_SHORT_NAME = "jsx-a11y-check";

/** All elements that should have an `alt` attribute set */
export const ALT_DEPENDANT_JSX_TAGS = ["img", "area", "input"] as const;

/** Case insensitive list of generic `alt` attribute values that should be avoided */
export const GENERIC_ALT_VALUES = ["photo", "image", "area", "input"] as const;

/**
 * Symbols that will be ignored when evaluating `alt` attribute values
 *
 * @remarks This array will be parsed into a RegEx string - certain symbols will have to be escaped!
 */
export const ALT_VALUE_IGNORED_SYMBOLS = [
	" ",
	"\\-",
	"_",
	"\\/",
	"\\\\",
	"|",
	"(",
	")",
	"[",
	"\\]",
	"{",
	"}",
	"^",
	"?",
	"!",
	"§",
	"$",
	"%",
	"&",
	"`",
	"+",
	"*",
	"#",
	"'",
	'"'
];
