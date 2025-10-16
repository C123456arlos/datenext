/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com', // Add more patterns for other hostnames
            },
        ],
    },
}

export default nextConfig;
