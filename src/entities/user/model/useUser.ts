import type { UserSettingsFormData } from '@/features/UserSettings';
import { useGetUserQuery, useUpdateUserMutation } from './user.api';

export const useUser = () => {
	const { data: user, isLoading: isUserLoading } = useGetUserQuery();
	const [updateUser, { isLoading: isUpdateUserLoading }] =
		useUpdateUserMutation();

	const updateUserData = async (dataToSend: UserSettingsFormData) => {
		try {
			const { data } = await updateUser(dataToSend).unwrap();
			return data || null;
		} catch {
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
