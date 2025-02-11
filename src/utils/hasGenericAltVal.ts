import { ALT_VALUE_IGNORED_SYMBOLS, GENERIC_ALT_VALUES } from "@/constants";
import { JSXOpeningElement, Literal } from "estree-jsx";

const ignoredSymbols = `[${ALT_VALUE_IGNORED_SYMBOLS.join("")}]*`;

const hasGenericAltVal = (element: JSXOpeningElement) => {
	return element.attributes.some(
		(attr) =>
			attr.type === "JSXAttribute" &&
			attr.name.name === "alt" &&
			attr.value?.type === "Literal" &&
			typeof attr.value.value === "string" &&
			GENERIC_ALT_VALUES.some((value) =>
				new RegExp(
					`^${ignoredSymbols + value + ignoredSymbols}$`,
					"i"
				).test((attr.value as Literal).value as string)
			)
	);
};

export default hasGenericAltVal;
