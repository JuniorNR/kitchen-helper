'use client';

import { HeroUIProvider as Provider } from '@heroui/system';

export const HeroUIProvider = ({ children }: { children: React.ReactNode }) => {
	return <Provider>{children}</Provider>;
};
