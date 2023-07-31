import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const config = {
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  testEnvironment: 'jest-environment-jsdom',
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config)



// module.exports = {
//   verbose: true,
//   // rootDir: './src', // Assuming your source code is in the src/ directory
//   testMatch: ['<rootDir>/__tests__/**/*.test.{js,jsx,ts,tsx}'],
//   moduleNameMapper: {
//     '^@/(.*)$': '<rootDir>/$1',
//   },
//   collectCoverage: true,
//   collectCoverageFrom: ['src/**/*.ts(x)'],
//   coverageDirectory: 'coverage',
//   // testEnvironment: 'jsdom',
//   // transform: {
//   //   '^.+\\.(js|jsx|ts|tsx)$': 'swc-jest',
//   // },
//   transform: {
//     '^.+\\.(js|jsx|ts|tsx)$': '@swc-node/jest',
//     // '^.+\\.tsx?$': 'ts-jest/esm',
//   },

//   transformIgnorePatterns: ['/node_modules/', '\\.pnp\\.[^\\/]+$'],
//   setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
//   // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
//   testEnvironment: 'jest-environment-jsdom',

//   globals: {
//     'ts-jest': {
//       tsconfig: 'tsconfig.json',
//       isolatedModules: true,
//       useESM: true,
//       diagnostics: false,
//     },
//   },
// };
