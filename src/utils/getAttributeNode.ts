import { JSXAttribute, JSXOpeningElement } from "estree-jsx";

/**
 * Retrieves the attribute node with the provided name from the provided JSX element
 * Returns the provided JSX element itself, if no attribute with the provided name exists
 *
 * @param element The JSX element to retrieve the attribute from
 * @param attrName The name of the attribute to retrieve (example: "alt")
 * @returns The requested attribute node, or the provided JSX element on failure
 */
const getAttributeNode = (element: JSXOpeningElement, attrName: string) => {
	return (
		element.attributes.find(
			(attr): attr is JSXAttribute =>
				attr.type === "JSXAttribute" && attr.name.name === attrName
		) || element
	);
};

export default getAttributeNode;
