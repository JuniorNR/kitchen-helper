'use server';
import { prisma } from '@/configs';
import type { SignUpFormData } from '../model/types';

export const signUp = async (data: SignUpFormData) => {
	try {
		const user = await prisma.user.create({
			data: {
				email: data.email,
				password: data.password,
			},
		});

		return user;
	} catch (error) {
		console.error(error);
		throw error;
	}
};
