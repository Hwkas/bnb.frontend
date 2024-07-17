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
    }
};

export default nextConfig;
