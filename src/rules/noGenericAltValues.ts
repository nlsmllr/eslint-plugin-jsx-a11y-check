import { Rule } from "eslint";
import { Node } from "estree-jsx";
import nodeIsJsxTag from "../utils/nodeIsJsxTag";
import { ALT_DEPENDANT_JSX_TAGS } from "@/constants";
import hasGenericAltVal from "@/utils/hasGenericAltVal";
import getAttributeNode from "@/utils/getAttributeNode";

const noGenericAltValues: Rule.RuleModule = {
	meta: {
		type: "problem",
		docs: {
			description: "Prevent the usage of generic `alt` attribute values"
		},
		messages: {
			genericAltValue:
				"Generic descriptions, like `Photo` or `Image` should be avoided in `alt` tags. They do not provide meaningful context."
		}
	},
	create(context) {
		return {
			JSXOpeningElement(node: Node) {
				if (nodeIsJsxTag(node, ALT_DEPENDANT_JSX_TAGS)) {
					if (hasGenericAltVal(node)) {
						context.report({
							node: getAttributeNode(node, "alt"),
							messageId: "genericAltValue"
						});
					}
				}
			}
		};
	}
};

export default noGenericAltValues;
