/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['openweathermap.org'],
    },
    async headers() {
        return [
            {
                source: '/:path*{/}?',
                headers: [
                    {
                        key: 'X-Accel-Buffering',
                        value: 'no',
                    },
                ],
            },
        ];
    },
};

export default nextConfig;