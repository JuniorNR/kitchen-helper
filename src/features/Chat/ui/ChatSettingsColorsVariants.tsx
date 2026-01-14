import { Button } from '@heroui/button';
import { motion } from 'motion/react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from '@/shared/ui';
import { CheckIcon } from '@/shared/ui/icons/checkIcon';
import type { ChatSettingsColorsVariantsProps } from '../model/chat.types';

export const ChatSettingsColorsVariants: FC<
	ChatSettingsColorsVariantsProps
> = ({
	title,
	handleColorThemeChange,
	chatThemeState,
	colorVariants,
	className,
	themeField,
	minimize = false,
}) => {
	const { t: tChats } = useTranslation('chats');
	const currentThemeColor = chatThemeState[themeField];

	return (
		<div className={`flex flex-col gap-6 ${className ?? ''}`}>
			<div>
				<Typography
					component="h4"
					classNameComponent="text-base font-semibold mb-3"
				>
					{title}
				</Typography>
				<div
					className={`grid ${
						minimize
							? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3'
							: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'
					}`}
				>
					{Object.entries(colorVariants).map((variant) => {
						const isActive = currentThemeColor?.classes === variant[1];
						return (
							<Button
								key={variant[0] + title}
								className={`relative ${minimize ? 'pt-2 pb-2 h-full gap-1' : 'h-36 gap-3'} flex flex-col items-center justify-center border-2 transition-all rounded-2xl ${
									isActive
										? 'border-primary bg-primary/5 shadow-lg scale-105'
										: 'border-default-200 hover:border-default-300 hover:shadow-md'
								}`}
								variant="flat"
								onPress={() =>
									handleColorThemeChange({
										colorName: variant[0],
										classes: variant[1],
									})
								}
							>
								<div
									className={`flex gap-1.5 w-full ${minimize ? 'h-12' : 'h-20'}`}
								>
									<div
										className={`flex-1 rounded-xl ${minimize ? 'h-12' : 'h-20'} shadow-sm border-1 border-white/90 dark:border-white/10 ${variant[1]}`}
									/>
								</div>

								<Typography
									component="span"
									classNameComponent={`font-semibold ${
										isActive ? 'text-primary' : 'text-foreground'
									}`}
								>
									{tChats(`settings.colors.color_names.${variant[0]}`) ||
										variant[0]}
								</Typography>
								{isActive && (
									<motion.div
										initial={{ scale: 0 }}
										animate={{ scale: 1 }}
										className="absolute top-1 right-3 w-4 h-4 rounded-full bg-primary flex items-center justify-center shadow-lg"
									>
										<CheckIcon className="w-3 h-3 text-white" />
									</motion.div>
								)}
							</Button>
						);
					})}
				</div>
			</div>
		</div>
	);
};
