import { Linter } from "eslint";
import { PLUGIN_SHORT_NAME } from "@/constants";

const recommendedLegacy: Linter.LegacyConfig = {
	plugins: [PLUGIN_SHORT_NAME],
	rules: {
		[`${PLUGIN_SHORT_NAME}/enforce-alt-tags`]: "warn",
		[`${PLUGIN_SHORT_NAME}/no-generic-alt-values`]: "warn"
	}
};

export default recommendedLegacy;
