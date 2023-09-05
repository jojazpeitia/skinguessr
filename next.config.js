/** @type {import('next').NextConfig} */
const nextConfig = {

    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: [{ loader: '@svgr/webpack', options: {icon: true} }],
        })

        return config
    },
    images: {
        domains: ['skinguessr.s3.us-east-2.amazonaws.com'],
    },
    // ...other config
}

module.exports = nextConfig
