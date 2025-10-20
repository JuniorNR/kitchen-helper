import type { SVGProps } from 'react';

export function TelegramIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			width="18"
			height="18"
			viewBox="0 0 24 24"
			fill="currentColor"
			aria-hidden="true"
			{...props}
		>
			<path d="M9.03 15.47 8.9 19.2c.41 0 .59-.18.8-.4l1.92-1.85 3.98 2.91c.73.4 1.26.19 1.46-.68l2.64-12.37h.01c.24-1.14-.41-1.58-1.11-1.3L3.52 9.77C2.41 10.22 2.42 10.86 3.33 11.14l4.94 1.54L18.43 6.9c.46-.3.88-.13.54.17" />
		</svg>
	);
}
