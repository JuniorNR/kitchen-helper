import { addAlert } from '@/features/Alert/model/alert.slice';
import type { UserSettingsFormData } from '@/features/UserSettings';
import { useAppDispatch } from '@/shared/lib/store';
import { useGetUserQuery, useUpdateUserMutation } from './user.api';

export const useUser = () => {
	const dispatch = useAppDispatch();
	const { data: user, isLoading: isUserLoading } = useGetUserQuery();
	const [updateUser, { isLoading: isUpdateUserLoading }] =
		useUpdateUserMutation();

	const updateUserData = async (dataToSend: UserSettingsFormData) => {
		try {
			const { data, code } = await updateUser(dataToSend).unwrap();

			if (data) {
				dispatch(
					addAlert({
						id: crypto.randomUUID(),
						status: 'success',
						title: 'success',
						description: code,
					}),
				);
				return data;
			} else {
				dispatch(
					addAlert({
						id: crypto.randomUUID(),
						status: 'danger',
						title: 'error',
						description: code,
					}),
				);
				return null;
			}
		} catch (error) {
			const code = (error as { data: { code: string } }).data?.code;
			dispatch(
				addAlert({
					id: crypto.randomUUID(),
					status: 'danger',
					title: 'error',
					description: code,
				}),
			);
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
