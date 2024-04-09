import { BuildOptions } from "./../types/types";
import type { Configuration } from "webpack";

export function buildResolvers(
  options: BuildOptions
): Configuration["resolve"] {
  return {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      "@": options.paths.src,
    },
  };
}
