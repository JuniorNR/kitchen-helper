import type { SVGProps } from 'react';
import { useTranslation } from 'react-i18next';

export function Logotype(props: SVGProps<SVGSVGElement>) {
	const { t: tCommon } = useTranslation('common');
	return (
		<svg fill="none" height="36" viewBox="0 0 32 32" width="36" {...props}>
			<title>{tCommon('app_name')} logo</title>
			<circle cx="11" cy="13" r="4.5" fill="currentColor" />
			<circle cx="21" cy="13" r="4.5" fill="currentColor" />
			<circle cx="16" cy="10" r="5" fill="currentColor" />
			<rect
				x="13.25"
				y="16"
				width="1.5"
				height="3.5"
				rx="0.75"
				fill="currentColor"
			/>
			<rect
				x="17.25"
				y="16"
				width="1.5"
				height="3.5"
				rx="0.75"
				fill="currentColor"
			/>
			<rect x="9" y="20" width="14" height="5" rx="2.5" fill="currentColor" />
			<rect
				x="12"
				y="21.5"
				width="1.25"
				height="2"
				rx="0.625"
				fill="currentColor"
			/>
			<rect
				x="15.375"
				y="21.5"
				width="1.25"
				height="2"
				rx="0.625"
				fill="currentColor"
			/>
			<rect
				x="18.75"
				y="21.5"
				width="1.25"
				height="2"
				rx="0.625"
				fill="currentColor"
			/>
		</svg>
	);
}
