import type { Config } from "jest";
import { createDefaultEsmPreset } from "ts-jest";

const presetConfig = createDefaultEsmPreset({
  tsconfig: {
    jsx: "react-jsx",
  },
});

const config: Config = {
  ...presetConfig,
  testEnvironment: "jsdom",
};

export default config;