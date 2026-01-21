import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	modularizeImports: {
		"@heroui/react": {
			transform: "@heroui/{{member}}",
			preventFullImport: true,
		},
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'images.unsplash.com',
			},
		],
	},
};

export default nextConfig;
