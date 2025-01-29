import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,  // Make sure the environment variable is correct
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2025-01-13', // Replace with the appropriate API version you're using
  useCdn: true,             // Use CDN for fast fetching in production (set to false for SSR)
  token: process.env.SANITY_API_TOKEN, // Use the token from environment variables for private access
})
