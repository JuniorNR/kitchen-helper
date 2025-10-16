import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	modularizeImports: {
		"@heroui/react": {
			transform: "@heroui/{{member}}",
			preventFullImport: true,
		},
	},
};

export default nextConfig;
