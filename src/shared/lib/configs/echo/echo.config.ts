import { configureEcho } from '@laravel/echo-react';
import Pusher from 'pusher-js';

declare global {
	interface Window {
		Pusher: typeof Pusher;
	}
}

const API_URL = process.env.NEXT_PUBLIC_APP_BACKEND_URL;
const PUSHER_KEY = process.env.NEXT_PUBLIC_PUSHER_APP_KEY;
const PUSHER_CLUSTER = process.env.NEXT_PUBLIC_PUSHER_CLUSTER ?? 'eu';

export const initEcho = (authToken: string) => {
	window.Pusher = Pusher;
	configureEcho({
		broadcaster: 'pusher',
		key: PUSHER_KEY,
		cluster: PUSHER_CLUSTER,
		forceTLS: true,
		authEndpoint: `${API_URL}/broadcasting/auth`,
		enabledTransports: ['ws', 'wss'],
		auth: {
			headers: {
				Authorization: `Bearer ${authToken}`,
				Accept: 'application/json',
			},
		},
	});
};
