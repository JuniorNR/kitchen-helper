import type { SVGProps } from 'react';

export function DragIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			{...props}
		>
			<title>Drag-vertical SVG Icon</title>
			<g fill="none" stroke="currentColor" strokeWidth="2">
				<circle cx="8" cy="4" r="1" transform="rotate(90 8 4)"></circle>
				<circle cx="16" cy="4" r="1" transform="rotate(90 16 4)"></circle>
				<circle cx="8" cy="12" r="1" transform="rotate(90 8 12)"></circle>
				<circle cx="16" cy="12" r="1" transform="rotate(90 16 12)"></circle>
				<circle cx="8" cy="20" r="1" transform="rotate(90 8 20)"></circle>
				<circle cx="16" cy="20" r="1" transform="rotate(90 16 20)"></circle>
			</g>
		</svg>
	);
}
