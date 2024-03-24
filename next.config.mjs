/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com', 'a0.muscache.com'],
    remotePatterns: [
      {
        hostname: 'a0.muscache.com',
        protocol: 'https',
        port: '',
      },
      {
        hostname: 'korytafaojwanmbffhep.supabase.co',
        protocol: 'https',
        port: '',
      },
    ],
  },
}

export default nextConfig
