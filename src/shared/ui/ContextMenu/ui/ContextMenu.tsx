'use client';

import { Button } from '@heroui/button';
import { AnimatePresence, motion } from 'framer-motion';
import { type FC, type JSX, useEffect, useRef, useState } from 'react';
import type {
	ContextMenuItem,
	ContextMenuProps,
} from '../model/contextMenu.types';

export const ContextMenu: FC<ContextMenuProps> = ({
	children,
	items,
	className = '',
}) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const menuRef = useRef<HTMLDivElement>(null);
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const handleOpenContextMenu = (event: React.MouseEvent) => {
		event.preventDefault();
		event.stopPropagation();
		const firstChild = containerRef.current?.childNodes[0];

		const mouseEnterEvent = new MouseEvent('mouseenter', {
			bubbles: true,
			cancelable: true,
			view: window,
		});
		firstChild?.dispatchEvent(mouseEnterEvent);
		setIsOpen(true);
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				menuRef.current &&
				!menuRef.current.contains(event.target as Node) &&
				containerRef.current &&
				!containerRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				setIsOpen(false);
			}
		};

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
			document.addEventListener('keydown', handleEscape);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('keydown', handleEscape);
		};
	}, [isOpen]);

	const renderItemShortCut = (
		item: ContextMenuItem,
	): JSX.Element | undefined => {
		if (item.shortcut) {
			if (Array.isArray(item.shortcut)) {
				return (
					<div className="flex opacity-0 group-hover:opacity-100 transition-opacity">
						{item.shortcut.map((shortcut, index) => {
							const itemsLength = item?.shortcut?.length || 0;
							return (
								<div key={shortcut}>
									<kbd className="px-1.5 py-0.5 bg-default-100 dark:bg-default-50 rounded text-xs">
										{shortcut}
									</kbd>
									{index !== itemsLength - 1 ? '+' : ''}
								</div>
							);
						})}
					</div>
				);
			}

			return (
				<div>
					<kbd className="px-1.5 py-0.5 bg-default-100 dark:bg-default-50 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">
						{item.shortcut}
					</kbd>
				</div>
			);
		}
	};

	return (
		<>
			{/* biome-ignore lint/a11y/noStaticElementInteractions: Контекстное меню требует обработки события на контейнере */}
			<div
				ref={containerRef}
				onContextMenu={handleOpenContextMenu}
				className={`relative ${className}`}
			>
				{children}
				<AnimatePresence>
					{isOpen && (
						<motion.div
							ref={menuRef}
							initial={{ opacity: 0, scale: 0.5 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.5 }}
							transition={{ duration: 0.1, ease: 'easeOut' }}
							className="flex flex-col gap-1 p-1 mt-2 bg-content1 border border-divider rounded-lg shadow-lg z-[9999] min-w-[180px]"
							role="menu"
						>
							{items.map((item) => (
								<Button
									key={item.label}
									type="button"
									onPress={() => {
										if (!item.disabled) {
											item.action();
											if (!item.isActionLoading) {
												setIsOpen(false);
											}
										}
									}}
									isLoading={item.isActionLoading}
									disabled={item.disabled}
									role="menuitem"
								>
									<div className="flex justify-between items-center w-full">
										<div className="flex items-center gap-2 mr-4">
											{item.icon}
											<span>{item.label}</span>
										</div>

										{renderItemShortCut(item)}
									</div>
								</Button>
							))}
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</>
	);
};
