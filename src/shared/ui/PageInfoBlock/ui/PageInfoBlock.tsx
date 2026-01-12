import type { FC } from 'react';
import { Typography } from '../../Typography';
import type { PageInfoBlockProps } from '../model/pageInfoBlock.types';

export const PageInfoBlock: FC<PageInfoBlockProps> = ({
	version,
	title,
	titleDescription,
	description,
}) => {
	return (
		<div className="flex flex-col gap-3 mb-10 text-center sm:text-left max-w-7xl">
			<Typography
				component="span"
				classNameComponent="uppercase tracking-[0.1em] text-blue-500"
			>
				{version} · {titleDescription}
			</Typography>
			<div className="space-y-2">
				<Typography
					component="h1"
					classNameComponent="leading-tight text-foreground sm:text-4xl"
				>
					{title}
				</Typography>
				<Typography classNameComponent="text-base leading-relaxed sm:text-lg">
					{description}
				</Typography>
			</div>
		</div>
	);
};
