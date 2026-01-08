// Для Windows/ESM-резолвинга у Next 15 нужна явная .js в пути
import nextJest from "next/jest.js";
import type { Config } from "jest";

const createJestConfig = nextJest({ dir: "./" });

const customConfig: Config = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
  moduleNameMapper: {
    "\\.(css|scss|sass)$": "identity-obj-proxy",
    "^@/(.*)$": "<rootDir>/src/$1",
    "^~/(.*)$": "<rootDir>/src/$1",
    "^.+\\.(png|jpg|jpeg|gif|svg|webp)$": "<rootDir>/__mocks__/fileMock.js"
  },
  testMatch: [
    "**/__tests__/**/*.(spec|test).[tj]s?(x)",
    "**/?(*.)+(spec|test).[tj]s?(x)"
  ],
  clearMocks: true
};

export default createJestConfig(customConfig);

