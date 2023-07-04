import { defineConfig } from 'cypress'
import { config } from "dotenv";
config();

export default defineConfig({
  e2e: {
    specPattern: 'cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}',
    baseUrl: 'http://localhost:4173',
    env: {
      BASE_API_URL: process.env.VITE_BASE_API_URL,
    },
  }
})
