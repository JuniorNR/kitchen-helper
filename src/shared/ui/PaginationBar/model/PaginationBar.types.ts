export interface PaginationBarProps {
	page: number;
	totalItems: number;
	currentPage: number;
	onPageChange: (page: number) => void;
}
