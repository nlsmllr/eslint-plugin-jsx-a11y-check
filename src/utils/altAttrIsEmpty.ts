import { ALT_VALUE_IGNORED_SYMBOLS } from "@/constants";
import { JSXOpeningElement } from "estree-jsx";

/**
 * Checks if the provided JSX element's `alt` attribute is empty
 *
 * @param element The JSX element to check
 */
const altAttrIsEmpty = (element: JSXOpeningElement) => {
	return element.attributes.some(
		(attr) =>
			attr.type === "JSXAttribute" &&
			attr.name.name === "alt" &&
			attr.value?.type === "Literal" &&
			typeof attr.value.value === "string" &&
			(attr.value.value.length === 0 ||
				new RegExp(`^[${ALT_VALUE_IGNORED_SYMBOLS.join("")}]+$`).test(
					attr.value.value
				))
	);
};

export default altAttrIsEmpty;
