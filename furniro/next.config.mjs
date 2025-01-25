export default {
  images: {
    domains: ['cdn.sanity.io'], // Allow Sanity images
  },
  reactStrictMode: true, // Optional, recommended for production apps
  env: {
    NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
    NEXT_PUBLIC_SANITY_TOKEN: process.env.NEXT_PUBLIC_SANITY_TOKEN, // If you're using a token
  },
};
