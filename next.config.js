/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        whatsAppSendUrl: 'whatsapp://send?&app_absent=0',
        whatsAppPn: '972507551896',
        facebookUrl: 'https://www.facebook.com/profile.php?id=',
        facebookPageId: '100063991727660',
    },
}

module.exports = nextConfig
