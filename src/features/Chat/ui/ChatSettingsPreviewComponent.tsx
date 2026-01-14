import type { FC } from 'react';
import { Typography } from '@/shared/ui';
import type { ChatSettingsPreviewComponentProps } from '../model/chat.types';

export const ChatSettingsPreviewComponent: FC<
	ChatSettingsPreviewComponentProps
> = ({ title, children, className = '' }) => {
	return (
		<div className={className}>
			<Typography
				component="h4"
				classNameComponent="text-base font-semibold mb-3"
			>
				{title}
			</Typography>
			<div className="w-full">{children}</div>
		</div>
	);
};
