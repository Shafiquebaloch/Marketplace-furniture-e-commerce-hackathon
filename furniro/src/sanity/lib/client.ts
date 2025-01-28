// src/sanity/lib/client.ts
import { createClient } from 'next-sanity';
// import { apiVersion, dataset, projectId } from '../env';
import dotenv from "dotenv"


dotenv.config()
// const sanityToken = process.env.SANITY_TOKEN; // If you're using the token on the server side

// Export the Sanity client with or without the token based on your need
export const client = createClient({
  projectId:'0i8rmmzy',
  dataset:'production',
  apiVersion:'2025-01-13',
  useCdn: true, // Set to false if you're using the token for server-side requests
  token: 'skwI9COMdcgfUz28VW5bgAdnMADYDbwrWx8JCcKttZYndtwpbTolc65FZ6viesnm4gHXSU0cLT4wE2xt4RUWsw5ZXDkeDFnXJpiigVFgi0fBb6lDcZRWnMxZkLXzNFUyux8zagFlz8r71l8v1D2IYbDFv8rfbPUVnBMBcztKcoyb6G4spZCj', // Only use token for server-side requests
});
