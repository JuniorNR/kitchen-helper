import type { SVGProps } from 'react';

export const SendMessageIcon = (props: SVGProps<SVGSVGElement>) => {
	return (
		<svg
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			aria-hidden="true"
			{...props}
		>
			<path
				d="M2.55 3.08 21.2 11.14c.93.4.93 1.6 0 2l-18.65 8.06c-.92.4-1.83-.43-1.58-1.36L4.37 12 1 4.3C.64 3.37 1.63 2.68 2.55 3.08Z"
				fill="currentColor"
			/>
			<path
				d="m9 12.75 3 3 4.5-5.25"
				fill="none"
				stroke="var(--send-icon-contrast, #fff)"
				strokeWidth={1.8}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};
