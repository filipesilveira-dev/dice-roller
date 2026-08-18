import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    // Força o uso do tsconfig específico do Jest
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.jest.json'
      }
    ],
  },
};

export default config;
