export interface BuildPaths {
  entry: string;
  html: string;
  outPuts: string;
  src: string;
  public: string;
}

export type BuildMode = "production" | "development";
export type BuildPlatform = "mobile" | "desktop";

export interface BuildOptions {
  port: number;
  paths: BuildPaths;
  mode: BuildMode;
  platform: BuildPlatform;
  isBundleAnalyzerApply?: boolean;
}
