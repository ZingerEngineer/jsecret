/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https', // Specify the protocol
        hostname: 'avatars.githubusercontent.com', // Specify the hostname
        port: '', // Leave empty if no specific port is needed
        pathname: '/u/**' // Match paths starting with /u/, using wildcard for any number of segments
      }
    ]
  }
}

export default nextConfig

