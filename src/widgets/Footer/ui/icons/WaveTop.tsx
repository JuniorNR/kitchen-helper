import type { SVGProps } from 'react';

export const WaveTop = (props: SVGProps<SVGSVGElement>) => {
	return (
		<svg
			width="100%"
			height="100%"
			viewBox="0 0 1440 80"
			preserveAspectRatio="none"
			style={{ display: 'block' }}
			role="img"
			aria-label="wave separator"
			{...props}
		>
			<path
				d="M0,64 C180,32 360,0 540,10 C720,20 900,74 1080,74 C1260,74 1350,42 1440,16 L1440,0 L0,0 Z"
				fill="currentColor"
			/>
		</svg>
	);
};
