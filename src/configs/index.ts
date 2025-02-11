import recommended from "./recommended";
import recommendedLegacy from "./recommendedLegacy";
import strict from "./strict";
import strictLegacy from "./strictLegacy";

const configs = {
	recommended,
	"recommended-legacy": recommendedLegacy,
	strict,
	"strict-legacy": strictLegacy
};

export default configs;
