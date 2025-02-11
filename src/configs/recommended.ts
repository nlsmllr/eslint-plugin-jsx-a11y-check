import { Linter } from "eslint";
import { PLUGIN_SHORT_NAME } from "@/constants";
import rules from "@/rules";

const recommended: Linter.Config = {
	name: "recommended",
	plugins: {
		[PLUGIN_SHORT_NAME]: { rules }
	},
	rules: {
		[`${PLUGIN_SHORT_NAME}/enforce-alt-tags`]: "warn",
		[`${PLUGIN_SHORT_NAME}/no-generic-alt-values`]: "warn"
	}
};

export default recommended;
