const asidePlaceholderItems = [1, 2, 3, 4];

export const ChatListAsideSkeleton = () => (
	<aside className="flex w-64 shrink-0 flex-col gap-4">
		<div className="h-10 rounded-2xl bg-slate-200/80 dark:bg-slate-800/70 animate-pulse" />
		{asidePlaceholderItems.map((item) => (
			<div
				key={`chat-placeholder-${item}`}
				className="h-16 rounded-2xl bg-slate-200/60 dark:bg-slate-800/60 animate-pulse"
			/>
		))}
	</aside>
);
