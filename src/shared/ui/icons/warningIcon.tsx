import type { SVGProps } from 'react';

export function WarningIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			{...props}
		>
			<title>Warning</title>
			<path
				fill="currentColor"
				d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2V8h2v6z"
			/>
		</svg>
	);
}
