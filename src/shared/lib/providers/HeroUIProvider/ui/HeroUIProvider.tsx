'use client';

import { HeroUIProvider as Provider } from '@heroui/react';

export const HeroUIProvider = ({ children }: { children: React.ReactNode }) => {
	return <Provider>{children}</Provider>;
};
