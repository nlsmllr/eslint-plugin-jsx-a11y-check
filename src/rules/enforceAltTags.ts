import { Rule } from "eslint";
import { Node } from "estree-jsx";
import nodeIsJsxTag from "../utils/nodeIsJsxTag";
import hasAltAttr from "@/utils/hasAltAttr";
import { ALT_DEPENDANT_JSX_TAGS } from "@/constants";
import altAttrIsEmpty from "@/utils/altAttrIsEmpty";
import getAttributeNode from "@/utils/getAttributeNode";

const enforceAltTags: Rule.RuleModule = {
	meta: {
		type: "problem",
		docs: {
			description: "Enforce `alt` attributes on image tags."
		},
		messages: {
			missingAltAttribute:
				"Provide an `alt` attribute to satisfy accessibility requirements.",
			emptyAltAttribute: "`alt` attributes cannot be empty."
		}
	},
	create(context) {
		return {
			JSXOpeningElement(node: Node) {
				if (nodeIsJsxTag(node, ALT_DEPENDANT_JSX_TAGS)) {
					if (!hasAltAttr(node)) {
						context.report({
							node,
							messageId: "missingAltAttribute"
						});
					}

					if (altAttrIsEmpty(node)) {
						context.report({
							node: getAttributeNode(node, "alt"),
							messageId: "emptyAltAttribute"
						});
					}
				}
			}
		};
	}
};

export default enforceAltTags;
