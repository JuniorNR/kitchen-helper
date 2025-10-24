import type { User, UserDTO } from '@/entities';

export interface SignUpFormData {
	name: string;
	email: string;
	password: string;
	passwordConfirmation: string;
}

export interface SignUpFormDataDTO {
	name: string;
	email: string;
	password: string;
	passwordConfirmation: string;
}

export interface LoginFormData {
	email: string;
	password: string;
}

export interface SignUpFormProps {
	onSubmit: (data: SignUpFormData) => void;
	formId?: string;
}

export interface LoginFormProps {
	onSubmit: (data: LoginFormData) => void;
	formId?: string;
}

export interface AuthResponse {
	user: User;
	token: string;
}

export interface AuthResponseDTO {
	user: UserDTO;
	token: string;
}

// Удалено в пользу универсального ApiErrorResponse
