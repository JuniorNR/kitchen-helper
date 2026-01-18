export interface ContextMenuItem {
	label: string;
	action: () => void;
	isActionLoading?: boolean;
	icon?: React.ReactNode;
	disabled?: boolean;
	shortcut?: string | string[];
}

export interface ContextMenuProps {
	children: React.ReactNode;
	items: ContextMenuItem[];
	className?: string;
}
