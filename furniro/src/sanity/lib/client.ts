// src/sanity/lib/client.ts
import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId } from '../env';

const sanityToken = process.env.SANITY_TOKEN; // If you're using the token on the server side

// Export the Sanity client with or without the token based on your need
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if you're using the token for server-side requests
  token: sanityToken, // Only use token for server-side requests
});
