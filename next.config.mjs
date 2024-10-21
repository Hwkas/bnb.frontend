/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    images: {
        // TODO i guess here just need to configure cache in nginx.conf
        unoptimized: true,
        // remotePatterns: [
        //     {
        //         protocol: "http",
        //         hostname: `${process.env.NEXT_PUBLIC_HOST_NAME}`,
        //         port: `${process.env.NEXT_PUBLIC_PORT}`,
        //         pathname: "/**",
        //     },
        // ],
    },
    experimental: {
        // taint: true,
        serverActions: {
            allowedOrigins: [
                `${process.env.NEXT_PUBLIC_HOST_NAME}`,
            ],
        },
    },
};

export default nextConfig;
