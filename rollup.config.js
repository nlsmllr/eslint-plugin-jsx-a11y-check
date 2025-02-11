import { rollup } from "rollup";
import { cleandir } from "rollup-plugin-cleandir";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import { dts } from "rollup-plugin-dts";
import colors from "colors";
import { rmSync } from "fs";
import terser from "@rollup/plugin-terser";

const OUT_DIR = "dist";
const DTS_CACHE_DIR = `${OUT_DIR}/.dts-cache`;
const isWatchMode = !!process.env.ROLLUP_WATCH;

/** @type {import('rollup').RollupOptions} */
export default {
	input: "src/index.ts",
	output: [
		{
			file: `${OUT_DIR}/index.js`,
			format: "esm",
			sourcemap: isWatchMode
		},
		{
			file: `${OUT_DIR}/index.cjs`,
			format: "cjs",
			sourcemap: isWatchMode
		}
	],
	plugins: [
		cleandir(OUT_DIR, { hook: "buildStart", order: "pre" }),
		nodeResolve(),
		typescript({
			tsconfig: ".ts/tsconfig.app.json",
			...(!isWatchMode && {
				declaration: true,
				declarationMap: false,
				declarationDir: DTS_CACHE_DIR
			}),
			outDir: OUT_DIR
		}),
		!isWatchMode && terser({ compress: { passes: 3, hoist_vars: true } }),
		{
			name: "dts-bundle",
			closeBundle: async () => {
				if (isWatchMode) return;

				const input = `${DTS_CACHE_DIR}/index.d.ts`;
				const file = `${OUT_DIR}/index.d.ts`;

				console.log(
					colors.cyan(
						`\n${colors.bold(input)} → ${colors.bold(file)}...`
					)
				);

				try {
					const startTime = Date.now();

					await (
						await rollup({
							input,
							plugins: [dts()]
						})
					).write({ file });

					const duration = `${(Date.now() - startTime).toString()}ms`;

					console.log(
						colors.green(
							`created ${colors.bold(file)} in ${colors.bold(duration)}`
						)
					);

					process.stdout.write(
						colors.cyan(
							`deleting ${colors.bold("declaration file cache")} at ` +
								colors.bold(DTS_CACHE_DIR) +
								"... "
						)
					);

					rmSync(DTS_CACHE_DIR, { recursive: true, force: true });

					console.log(colors.bold.green("done"));
				} catch (e) {
					if (
						typeof e === "object" &&
						!!e &&
						"stack" in e &&
						typeof e.stack === "string"
					) {
						const message = `[!] ${e.stack.split("\n")[0]}\n`;
						const stack = e.stack.split("\n").splice(1).join("\n");

						console.error(
							colors.bold.red(message) + colors.dim(stack)
						);
					} else {
						console.error(
							colors.bold.red("[!] Unknown Error: "),
							e
						);
					}
				}
			}
		}
	]
};
