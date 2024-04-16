import HtmlWebpackPlugin from "html-webpack-plugin";
import type { Configuration } from "webpack";
import { DefinePlugin, ProgressPlugin } from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import path from "path";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import { BuildOptions } from "./types/types";

export function buildDevPlugins({
  mode,
  paths,
  isBundleAnalyzerApply,
  platform,
}: BuildOptions): Configuration["plugins"] {
  const isDev = mode === "development";
  const isProd = mode === "production";

  const plugins: Configuration["plugins"] = [
    new HtmlWebpackPlugin({
      template: paths.html,
      favicon: path.resolve(paths.public, "icon.ico"),
      publicPath: "/",
    }),
    new DefinePlugin({
      __PLATFORM__: JSON.stringify(platform),
    }),
  ];

  if (isDev) {
    plugins.push(
      new ProgressPlugin(),
      // new ForkTsCheckerWebpackPlugin(),
      new ReactRefreshWebpackPlugin()
    );
  }

  if (isProd) {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: "css/[name].[contenthash:8].css",
        chunkFilename: "css/[name].[contenthash:8].css",
      }),
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(paths.public, "locales"),
            to: path.resolve(paths.outPuts, "locales"),
          },
        ],
      })
    );

    isBundleAnalyzerApply && plugins.push(new BundleAnalyzerPlugin());
  }

  return plugins;
}
