import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import { BuildOptions } from "../types/types";

export function buildDevServer({ port }: BuildOptions): DevServerConfiguration {
  return {
    port: port ?? 3000,
    open: true,
    // Если раздавать статику через nginks, то надо делать проксирование на Index.html
    historyApiFallback: true,
    hot: true,
  };
}
