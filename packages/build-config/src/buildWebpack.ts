import webpack from "webpack";
import { buildDevLoaders } from "./buildLoaders";
import { buildDevServer } from "./buildDevServer";
import { buildDevPlugins } from "./buildPlagins";
import { buildResolvers } from "./buildResolvers";
import { BuildOptions } from "./types/types";

export function buildWebpack(options: BuildOptions): webpack.Configuration {
  const { mode, paths } = options;
  const isDev = mode === "development";

  return {
    mode: mode ?? "development",
    entry: paths.entry,
    output: {
      path: paths.outPuts,
      filename: "[name].[contenthash].js",
      clean: true,
    },
    plugins: buildDevPlugins(options),
    module: {
      rules: buildDevLoaders(options),
    },
    resolve: buildResolvers(options),
    devServer: isDev ? buildDevServer(options) : undefined,
    devtool: isDev ? "inline-source-map" : false,
  };
}
