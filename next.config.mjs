/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: `${process.env.NEXT_PUBLIC_HOST_NAME}`,
                port: `${process.env.NEXT_PUBLIC_PORT}`,
                pathname: "/**",
            }
        ]
    },
    experimental: {
        serverActions: {
            allowedOrigins: [
                "localhost:3000",
                `${process.env.NEXT_PUBLIC_HOST_NAME}:${process.env.NEXT_NGINX_PORT}`
            ],
        }
    }
};

export default nextConfig;
