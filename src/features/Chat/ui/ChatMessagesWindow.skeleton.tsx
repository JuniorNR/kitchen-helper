const messagesPlaceholderItems = [1, 2, 3, 4];

export const ChatMessagesWindowSkeleton = () => (
	<div className="flex min-w-[400px] flex-1 flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-inner dark:border-slate-800 dark:bg-slate-950">
		<div className="space-y-2">
			<div className="h-6 w-1/3 rounded bg-slate-200/80 dark:bg-slate-800/60 animate-pulse" />
			<div className="h-4 w-1/5 rounded bg-slate-200/60 dark:bg-slate-800/50 animate-pulse" />
		</div>

		<div className="mt-6 flex-1 overflow-hidden">
			{messagesPlaceholderItems.map((item) => (
				<div
					key={`message-placeholder-${item}`}
					className={`flex mb-4 ${item % 2 === 0 ? 'justify-start' : 'justify-end'}`}
				>
					<div className="h-16 w-[60%] rounded-2xl bg-slate-200/50 dark:bg-slate-800/50 animate-pulse" />
				</div>
			))}
		</div>

		<div className="mt-auto flex gap-3">
			<div className="h-12 flex-1 rounded-2xl bg-slate-200/70 dark:bg-slate-800/70 animate-pulse" />
			<div className="h-12 w-16 rounded-2xl bg-slate-200/70 dark:bg-slate-800/70 animate-pulse" />
		</div>
	</div>
);
