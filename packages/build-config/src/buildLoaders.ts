import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { ModuleOptions, runtime } from "webpack";
import ReactRefreshTypeScript from "react-refresh-typescript";
import { buildBabelLoader } from "./babel/buildBabelLoader";
import { BuildOptions } from "./types/types";

export function buildDevLoaders({
  mode,
}: BuildOptions): ModuleOptions["rules"] {
  const isDev = mode === "development";

  const babelLoader = buildBabelLoader(mode);

  const tsLoader = {
    test: /\.tsx?$/,
    use: [
      {
        loader: "ts-loader",
        options: {
          getCustomTransformers: () => ({
            before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
          }),
          transpileOnly: true,
        },
      },
    ],
    exclude: /node_modules/,
  };

  const cssModulesLoader = {
    loader: "css-loader",
    options: {
      modules: {
        localIdentName: isDev ? "[path][name]__[local]" : "[hash:base64:5]",
      },
    },
  };

  const assetsLoader = {
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: "asset/resource",
  };

  const SVGRLoader = {
    test: /\.svg$/,
    use: [
      {
        loader: "@svgr/webpack",
        options: {
          icon: true,
          svgConfig: {
            plugins: [
              {
                name: "convertColors",
                params: {
                  currentColor: true,
                },
              },
            ],
          },
        },
      },
    ],
  };

  const scssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      // Creates `style` nodes from JS strings
      isDev ? "style-loader" : MiniCssExtractPlugin.loader,
      // Translates CSS into CommonJS
      cssModulesLoader,
      // Compiles Sass to CSS
      "sass-loader",
    ],
  };

  return [
    //Порядок лоадеров важен!!!
    assetsLoader,
    SVGRLoader,
    scssLoader,
    tsLoader,
    // babelLoader,
  ];
}
