import { Linter } from "eslint";
import { PLUGIN_SHORT_NAME } from "@/constants";
import rules from "@/rules";

const strict: Linter.Config = {
	name: "strict",
	plugins: {
		[PLUGIN_SHORT_NAME]: { rules }
	},
	rules: {
		[`${PLUGIN_SHORT_NAME}/enforce-alt-tags`]: "error",
		[`${PLUGIN_SHORT_NAME}/no-generic-alt-values`]: "error"
	}
};

export default strict;
