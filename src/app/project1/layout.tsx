import { AppProviders } from '@/shared/lib/providers/AppProviders';
import { Project1Navigation } from './ui/Project1Navigation';

export default function Project1Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<AppProviders>
			<Project1Navigation />
			<div className="fixed inset-0 overflow-hidden bg-black">{children}</div>
		</AppProviders>
	);
}
