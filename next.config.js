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
        domains: ['d1b4y9dmiowx8u.cloudfront.net'],
    },
    // ...other config
}

module.exports = nextConfig
