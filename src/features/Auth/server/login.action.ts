'use server';

import { prisma } from '@/configs';
import type { LoginFormData } from '../model/types';

export const login = async (data: LoginFormData) => {
	try {
		const user = await prisma.user.findUnique({
			where: {
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
