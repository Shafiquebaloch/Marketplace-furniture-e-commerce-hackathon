// next.config.mjs (ES Module Syntax)
export default {
  images: {
    domains: ['cdn.sanity.io'],
  },
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
    NEXT_PUBLIC_SANITY_API_VERSION: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
    SANITY_TOKEN: process.env.SANITY_TOKEN,
  },
};
