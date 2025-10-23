export type TypographyProps = {
	children: string | string[];
	tooltip?: boolean;
	className?: string;
	component?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'p';
	maxLength?: number | null;
};
