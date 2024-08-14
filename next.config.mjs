/** @type {import('next').NextConfig} */
const nextConfig = {
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
        serverActions: {
            allowedOrigins: [
                `${process.env.NEXT_PUBLIC_HOST_NAME}:${process.env.NEXT_NGINX_PORT}`,
            ],
        },
    },
};

export default nextConfig;
