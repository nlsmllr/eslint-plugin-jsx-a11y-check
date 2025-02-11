import { Linter } from "eslint";
import { PLUGIN_SHORT_NAME } from "@/constants";

const strictLegacy: Linter.LegacyConfig = {
	plugins: [PLUGIN_SHORT_NAME],
	rules: {
		[`${PLUGIN_SHORT_NAME}/enforce-alt-tags`]: "error",
		[`${PLUGIN_SHORT_NAME}/no-generic-alt-values`]: "error"
	}
};

export default strictLegacy;
