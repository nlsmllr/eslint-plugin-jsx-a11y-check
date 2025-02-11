import { JSXOpeningElement } from "estree-jsx";

/**
 * CHecks if the provided JSX element has an `alt` attribute
 *
 * @param element The JSX element to check
 */
const hasAltAttr = (element: JSXOpeningElement) => {
	return element.attributes.some(
		(attr) => attr.type === "JSXAttribute" && attr.name.name === "alt"
	);
};

export default hasAltAttr;
