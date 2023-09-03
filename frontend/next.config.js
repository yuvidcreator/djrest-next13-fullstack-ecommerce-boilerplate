/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        REST_API_ENDPOINT: process.env.REST_API_HOST,
    },
    poweredByHeader: false,
    trailingSlash: true,
    i18n: {
        locales: ['en-US', 'fr', 'nl-NL', 'nl-BE'],
        defaultLocale: 'en-US',
    },
    typescript: {
		ignoreBuildErrors: true,
	},
    images: {
        domains: [
            'localhost',
            '127.0.0.1',
            'res.cloudinary.com', 
            'lh3.googleusercontent.com', 
            'source.unsplash.com', 
            'images.unsplash.com', 
            'mdbcdn.b-cdn.net', 
            'seekpng.com',
            'api.innerkomfort.in',
            'devapi.innerkomfort.in',
            'innerkomfort.in'
        ],
    }
}

module.exports = nextConfig
