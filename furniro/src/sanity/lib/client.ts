import { createClient } from 'next-sanity'

// Ensure that you're accessing the right environment variables
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION;

export const client = createClient({
  projectId,       // Use project ID from environment variables
  dataset,         // Use dataset from environment variables
  apiVersion,      // Use API version from environment variables
  useCdn: true,    // Using CDN for faster queries (set to false for real-time data)
});
