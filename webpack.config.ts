import webpack from "webpack";
import { buildWebpack } from "./configs/build/buildWebpack";
import { BuildMode, BuildPlatform } from "./configs/types/types";
import path from "path";

interface EnvVariables {
  mode: BuildMode;
  port: number;
  platform: BuildPlatform;
  analyze?: boolean;
}

export default (env: EnvVariables) => {
  const config: webpack.Configuration = buildWebpack({
    port: env.port ?? 3000,
    mode: env.mode ?? "development",
    paths: {
      html: path.resolve(__dirname, "public", "index.html"),
      entry: path.resolve(__dirname, "src", "index.tsx"),
      outPuts: path.resolve(__dirname, "build"),
      src: path.resolve(__dirname, "src"),
      public: path.resolve(__dirname, "public"),
    },
    isBundleAnalyzerApply: env.analyze,
    platform: env.platform || "desktop",
  });

  return config;
};
