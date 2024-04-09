import { BuildMode } from "configs/types/types";
import { removeDataTestIdPlugin } from "./removeDataTestidPlugin";

export function buildBabelLoader(mode: BuildMode) {
  const isDev = mode === "development";

  const plugins = isDev
    ? []
    : [
        [
          removeDataTestIdPlugin,
          {
            props: ["data-testid"],
          },
        ],
      ];

  return {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: {
      loader: "babel-loader",
      options: {
        presets: [
          "@babel/preset-env",
          "@babel/preset-typescript",
          [
            "@babel/preset-react",
            {
              runtime: isDev ? "automatic" : "classic",
            },
          ],
        ],
        plugins,
      },
    },
  };
}
