import { Pagination } from '@heroui/pagination';
import type { FC } from 'react';
import type { PaginationBarProps } from '../model/PaginationBar.types';

export const PaginationBar: FC<PaginationBarProps> = ({
	currentPage,
	page,
	onPageChange,
	totalItems = 0,
}) => {
	const calculateTotalPage = (
		countOfElementsTotal: number,
		elementsPerPage: number,
	) => {
		return Math.ceil(countOfElementsTotal / elementsPerPage);
	};
	return (
		<div className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-4">
			<Pagination
				page={page}
				onChange={onPageChange}
				showControls
				total={calculateTotalPage(totalItems, 6)}
				initialPage={currentPage}
				color="primary"
				variant="light"
			/>
		</div>
	);
};
