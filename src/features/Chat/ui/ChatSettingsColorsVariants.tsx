import { Button } from '@heroui/button';
import { motion } from 'motion/react';
import type { FC } from 'react';
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
}) => {
	// Определяем, какое поле темы нужно проверять на основе переданного themeField
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
				<div className="grid grid-cols-3 gap-4">
					{Object.entries(colorVariants).map((variant) => {
						const isActive = currentThemeColor?.classes === variant[1];
						return (
							<Button
								key={variant[0] + title}
								className={`relative h-36 flex flex-col items-center justify-center gap-3 border-2 transition-all rounded-2xl ${
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
								<div className="flex gap-1.5 w-full h-20">
									<div
										className={`flex-1 rounded-xl shadow-sm border-1 border-white/90 dark:border-white/10 ${variant[1]}`}
									/>
								</div>

								<Typography
									component="span"
									classNameComponent={`text-sm font-semibold ${
										isActive ? 'text-primary' : 'text-foreground'
									}`}
								>
									{variant[0]}
								</Typography>
								{isActive && (
									<motion.div
										initial={{ scale: 0 }}
										animate={{ scale: 1 }}
										className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary flex items-center justify-center shadow-lg"
									>
										<CheckIcon className="w-4 h-4 text-white" />
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
