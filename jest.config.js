'use strict';

const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("./tsconfig.json");

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>/src/"
  }),
  modulePathIgnorePatterns: [
    "tests/mocks"
  ],
  moduleFileExtensions: [
    "js",
    "json",
    "ts",
  ],
  rootDir: ".",
  testRegex: ".*\\.test\\.ts$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest"
  },
  collectCoverageFrom: [
    "**/*.(t|j)s"
  ],
  coverageDirectory: "tests/coverage",
  globalSetup: "<rootDir>/tests/setup.ts",
  testEnvironment: "node",
};
