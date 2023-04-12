/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: '',
    reactStrictMode: false,
    env: {
        whatsAppSendUrl: 'whatsapp://send?&app_absent=0',
        whatsAppPn: '972507551896',
        facebookUrl: 'https://www.facebook.com/profile.php?id=',
        facebookPageId: '100063991727660',
    },
    async rewrites() {
        return {
            beforeFiles: [
                {
                    source: '/public/:any*',
                    destination: '/:any*',
                }
            ]
        }
    },
}

module.exports = nextConfig
