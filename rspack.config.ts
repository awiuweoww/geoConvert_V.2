import { defineConfig } from "@rspack/cli";
import { rspack } from "@rspack/core";
import RefreshPlugin from "@rspack/plugin-react-refresh";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const isDev = process.env.NODE_ENV === "development";

export default defineConfig({
	context: __dirname,
	entry: {
		main: "./src/main.tsx"
	},
	resolve: {
		extensions: ["...", ".ts", ".tsx", ".jsx"],
		extensionAlias: {
			".js": [".js", ".ts", ".tsx"],
			".jsx": [".jsx", ".tsx"]
		}
	},
	module: {
		rules: [
			{
				test: /\.(png|jpe?g|gif|webp)$/i,
				type: "asset"
			},
			{
				test: /\.svg$/,
				type: "asset"
			},
			{
				test: /\.(jsx?|tsx?)$/,
				use: [
					{
						loader: "builtin:swc-loader",
						options: {
							jsc: {
								parser: {
									syntax: "typescript",
									tsx: true
								},
								transform: {
									react: {
										runtime: "automatic",
										development: isDev,
										refresh: isDev
									}
								}
							},
							env: {
								targets: ["chrome >= 87", "edge >= 88", "firefox >= 78", "safari >= 14"]
							}
						}
					}
				]
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: "postcss-loader",
						options: {
							postcssOptions: {
								plugins: ["@tailwindcss/postcss", "autoprefixer"]
							}
						}
					}
				],
				type: "css"
			},
			// Fix for gRPC-Web generated files using 'require' in an ESM project
			{
				test: /\.js$/,
				include: [/generated/],
				type: "javascript/auto"
			}
		]
	},
	plugins: [
		new rspack.HtmlRspackPlugin({
			template: "./index.html"
		}),
		isDev && new RefreshPlugin()
	].filter(Boolean),
	optimization: {
		minimizer: [new rspack.SwcJsMinimizerRspackPlugin(), new rspack.LightningCssMinimizerRspackPlugin()]
	},
	experiments: {
		css: true
	}
});
