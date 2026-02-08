// // // /** @type {import('next').NextConfig} */
// // // const nextConfig = {
// // //   /* config options here */
// // //   reactCompiler: true,
// // // };

// // // export default nextConfig;

// // /** @type {import('next').NextConfig} */
// // const nextConfig = {
// //   // Increase API route body size limit to 50MB
// //   api: {
// //     bodyParser: {
// //       sizeLimit: '50mb',
// //     },
// //   },
  
// //   // For App Router (Next.js 13+), you need experimental settings
// //   experimental: {
// //     serverActions: {
// //       bodySizeLimit: '50mb',
// //     },
// //   },

// //   images: {
// //     domains: ['res.cloudinary.com'], // Add Cloudinary domain for Next.js Image component
// //   },
// // };

// // module.exports = nextConfig;


// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   experimental: {
//     serverActions: {
//       bodySizeLimit: '50mb',
//     },
//   },
//   images: {
//     domains: ['res.cloudinary.com'],
//   },
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
  },
};

export default nextConfig;