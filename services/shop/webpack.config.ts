import webpack from "webpack";
import { BuildMode, BuildPlatform, buildWebpack } from "@packages/build-config";
import path from "path";
import packageJson from "./package.json";

interface EnvVariables {
  mode: BuildMode;
  port: number;
  platform: BuildPlatform;
  analyze?: boolean;
}

export default (env: EnvVariables) => {
  const config: webpack.Configuration = buildWebpack({
    port: env.port ?? 3001,
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

  config.plugins.push(
    new webpack.container.ModuleFederationPlugin({
      name: "shop",
      filename: "remoteEntry.js",
      exposes: {
        "./Router": "./src/router/Router.tsx",
      },
      shared: {
        ...packageJson.dependencies,
        react: {
          eager: true,
          requiredVersion: packageJson.dependencies["react"],
        },
        "react-router-dom": {
          eager: true,
          requiredVersion: packageJson.dependencies["react-router-dom"],
        },
        "react-dom": {
          eager: true,
          requiredVersion: packageJson.dependencies["react-dom"],
        },
      },
    })
  );

  return config;
};
