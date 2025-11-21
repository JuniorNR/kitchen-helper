import type { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

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

export type ApiErrorDTO = FetchBaseQueryError & {
	status: number;
	data: {
		code?: string;
		current_role?: string;
		required_roles?: string[];
	};
};
export type ApiError = FetchBaseQueryError & {
	status: number;
	data: {
		code?: string;
		currentRole?: string;
		requiredRoles?: string[];
	};
};
