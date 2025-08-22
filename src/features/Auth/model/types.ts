export interface SignUpFormData {
	email: string;
	password: string;
	confirmPassword: string;
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
