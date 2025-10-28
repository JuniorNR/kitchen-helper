export interface ApiResponsePaginationDTO {
	current_page: number;
	last_page: number;
	per_page: number;
	total: number;
	next: string | null;
	prev: string | null;
}

export interface ApiResponsePagination {
	currentPage: number;
	lastPage: number;
	perPage: number;
	total: number;
	next: string | null;
	prev: string | null;
}

export interface ApiResponse<
	T,
	U extends
		| ApiResponsePaginationDTO
		| ApiResponsePagination = ApiResponsePagination,
> {
	data: T;
	pagination: U;
	code: string;
}
