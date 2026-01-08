import type { Market } from '@/entities/market';

export interface UserDTO {
	id: number;
	name: string;
	email: string;
	markets: Market[];
	email_verified_at: string;
	created_at: string;
	updated_at: string;
}

export interface User {
	id: number;
	name: string;
	email: string;
	markets: Market[];
	emailVerifiedAt: string;
	createdAt: string;
	updatedAt: string;
}
