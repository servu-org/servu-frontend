/** @type {import('next').NextConfig} */

const isGithubActions = process.env.GITHUB_ACTIONS === 'true'
const repo = 'servu-frontend' // Replace with your repository name

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: isGithubActions ? `/${repo}` : '',
  assetPrefix: isGithubActions ? `/${repo}/` : '',
  images: {
    unoptimized: true, // Required for static export with next/image
  },
}

module.exports = nextConfig
