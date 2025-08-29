import { useDispatch } from 'react-redux';
import { useGetUserQuery, useUpdateUserMutation } from './user.api';
import type { User } from './user.types';

export const useUser = () => {
	const dispatch = useDispatch();
	const { data: user, isLoading: isUserLoading } = useGetUserQuery();
	const [updateUser, { isLoading: isUpdateUserLoading }] =
		useUpdateUserMutation();

	const updateUserData = async (dataToSend: Partial<User>) => {
		try {
			const { data, code } = await updateUser(dataToSend).unwrap();
			if (data) {
				return data;
			}
			return null;
		} catch (_) {
			return null;
		}
	};

	return {
		user,
		isUserLoading,
		updateUserData,
		isUpdateUserLoading,
	};
};
