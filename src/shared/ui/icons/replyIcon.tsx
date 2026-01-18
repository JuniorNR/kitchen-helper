import type { SVGProps } from 'react';

export const ReplyIcon = (props: SVGProps<SVGSVGElement>) => {
	return (
		<svg
			width="16"
			height="16"
			viewBox="0 0 24 24"
			fill="none"
			aria-hidden="true"
			{...props}
		>
			<path
				d="M3 10L9 4V8C15.5 8 19 9.5 21 14C20 10.5 17 8 9 8V12L3 10Z"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				fill="none"
			/>
		</svg>
	);
};
