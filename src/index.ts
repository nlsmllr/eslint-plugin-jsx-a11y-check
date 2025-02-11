import { readFileSync } from "fs";
import { dirname } from "path";
import configs from "./configs";
import rules from "./rules";

const pkg = JSON.parse(
	readFileSync(new URL("./package.json", dirname(import.meta.url)), "utf8")
) as unknown;

if (
	typeof pkg !== "object" ||
	!pkg ||
	!("name" in pkg) ||
	typeof pkg.name !== "string" ||
	!("version" in pkg) ||
	typeof pkg.version !== "string"
)
	throw new Error(
		"[eslint-plugin-jsx-a11y-check] Error: Unable to parse package metadata"
	);

const jsxA11yCheck = {
	meta: {
		name: pkg.name,
		version: pkg.version
	},
	configs,
	rules
};

export default jsxA11yCheck;
