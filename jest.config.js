/** @type {import('jest').Config} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  silent: false,
  verbose: true,
  collectCoverageFrom: ["HW4/**"],
  coverageReporters: ["text"],
  setupFilesAfterEnv: ["jest-extended/all"]
};
