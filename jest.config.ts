import type { Config } from "jest";
import { createDefaultEsmPreset } from "ts-jest";

const presetConfig = createDefaultEsmPreset();

const config: Config = {
  ...presetConfig,
  testEnvironment: "jsdom",
};

export default config;