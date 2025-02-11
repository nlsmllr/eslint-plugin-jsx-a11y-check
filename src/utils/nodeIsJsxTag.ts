import { ExaminedJsxElement } from "@/types";
import { JSXOpeningElement, Node, JSXAttribute, Literal } from "estree-jsx";

/**
 * Checks if a the provided node has one of the provided JSX tag names
 *
 * @param node The ESTree node to check
 * @param jsxTagNames The JSX tag names to check against (e.g. 'img')
 */
const nodeIsJsxTag = (
	node: Node,
	jsxTagNames: readonly ExaminedJsxElement[]
): node is JSXOpeningElement => {
	if (node.type !== "JSXOpeningElement") return false;

	const nodeTagName =
		node.name.type === "JSXIdentifier"
			? node.name.name
			: node.name.type === "JSXNamespacedName"
				? node.name.name.name
				: node.name.object.type === "JSXIdentifier"
					? node.name.object.name
					: undefined;

	if (
		nodeTagName === "input" &&
		node.attributes
			.find(
				(attr): attr is JSXAttribute & { value: Literal } =>
					attr.type === "JSXAttribute" &&
					attr.name.name === "type" &&
					attr.value?.type === "Literal"
			)
			?.value.value?.toString() !== "image"
	)
		return false;

	return (
		!!nodeTagName && jsxTagNames.includes(nodeTagName as ExaminedJsxElement)
	);
};

export default nodeIsJsxTag;
