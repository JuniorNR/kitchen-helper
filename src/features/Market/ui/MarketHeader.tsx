import { Button } from '@heroui/button';
import { useRouter } from 'next/navigation';
import { type FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SwiperSlide } from 'swiper/react';
import { useChat, useUser } from '@/entities';
import { ImageSRC } from '@/features';
import { localStorageHelper } from '@/shared/lib/helpers';
import { CustomInput, Modal, Slider, Typography } from '@/shared/ui';
import { SendMessageIcon } from '@/shared/ui/icons/sendMessageIcon';
import fallbackImg from '@/shared/ui/images/default.jpg';
import type { MarketHeaderProps } from '../model/market.types';

export const MarketHeader: FC<MarketHeaderProps> = ({ market }) => {
	const { storageSetItem } = localStorageHelper('active_chat_id');
	const DETAIL_IMAGE_SIZES =
		'(min-width: 1200px) 50vw, (min-width: 768px) 60vw, 100vw';

	const router = useRouter();
	const { user } = useUser();
	const { createChatData, isCreatingChat } = useChat({ skip: true });

	const { t: tMarkets } = useTranslation('markets');

	const [chatName, setChatName] = useState<string>(market.title);

	const isOwnMarket = user?.id === market.sellerId;

	const renderImages = () => {
		if (market?.images?.length) {
			return market.images.map((image) => (
				<SwiperSlide key={image.path}>
					<div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl">
						<ImageSRC
							src={image.path || 'preview.jpg'}
							alt={image.path || 'preview image'}
							fill
							sizes={DETAIL_IMAGE_SIZES}
							className="object-cover"
						/>
					</div>
				</SwiperSlide>
			));
		}
		return (
			<SwiperSlide>
				<div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl">
					<ImageSRC
						alt="fallback photo"
						src={fallbackImg.src}
						default
						fill
						sizes={DETAIL_IMAGE_SIZES}
						className="object-cover"
					/>
				</div>
			</SwiperSlide>
		);
	};

	const handleCreateAndRedirectChat = async () => {
		const result = await createChatData({
			name: chatName.length > 0 ? chatName : market.title,
			userIds: [market.sellerId],
		});
		if (result) {
			storageSetItem(String(result.id));
			router.push(`/settings`);
		}
	};

	return (
		<div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-8 mb-8 items-stretch">
			<div className="relative w-full">
				<div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-content1/40 to-content2/40 shadow-xl">
					<Slider className="h-full">{renderImages()}</Slider>
				</div>
			</div>

			<div className="flex flex-col gap-6 h-full">
				<div className="grid grid-cols-3 gap-4">
					<div className="flex flex-col items-center justify-center p-4 rounded-xl border border-amber-400/40 bg-gradient-to-br from-amber-50/80 to-amber-100/50 dark:border-amber-300/30 dark:from-amber-900/30 dark:to-amber-800/20 shadow-md">
						<div className="flex items-center gap-2 mb-1">
							<div className="text-2xl leading-none">★</div>
							<Typography
								component="span"
								classNameComponent="text-2xl font-bold text-amber-700 dark:text-amber-300"
							>
								{market.rating || '0.0'}
							</Typography>
						</div>
						<Typography
							component="span"
							classNameComponent="text-xs uppercase tracking-wide text-amber-600 dark:text-amber-400"
						>
							{tMarkets('card.rating')}
						</Typography>
					</div>

					<div className="flex flex-col items-center justify-center p-4 rounded-xl border border-sky-400/40 bg-gradient-to-br from-sky-50/80 to-sky-100/50 dark:border-sky-300/30 dark:from-sky-900/30 dark:to-sky-800/20 shadow-md">
						<Typography
							component="span"
							classNameComponent="text-2xl font-bold text-sky-700 dark:text-sky-300 mb-1"
						>
							{String(market.countOfRecipes)}
						</Typography>
						<Typography
							component="span"
							classNameComponent="text-xs uppercase tracking-wide text-sky-600 dark:text-sky-400 text-center"
						>
							{tMarkets('card.count_of_recipes')}
						</Typography>
					</div>

					<div className="flex flex-col items-center justify-center p-4 rounded-xl border border-emerald-400/40 bg-gradient-to-br from-emerald-50/80 to-emerald-100/50 dark:border-emerald-300/30 dark:from-emerald-900/30 dark:to-emerald-800/20 shadow-md">
						<Typography
							component="span"
							className="mb-1"
							classNameComponent="text-2xl font-bold text-emerald-700 dark:text-emerald-300"
						>
							{market.averagePrice} ₽
						</Typography>
						<Typography
							component="h4"
							classNameComponent="text-xs uppercase tracking-wide text-emerald-600 dark:text-emerald-400"
						>
							{tMarkets('card.average_price')}
						</Typography>
					</div>
				</div>
				<div className="flex flex-col gap-4 p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-content1/60 to-content2/40 shadow-lg w-full h-full flex-1 justify-between">
					<div className="flex flex-col gap-4">
						<Typography
							component="h1"
							classNameComponent="text-4xl font-bold leading-tight text-foreground"
						>
							{market.title}
						</Typography>

						{market.description && (
							<Typography classNameComponent="text-lg text-foreground-600 dark:text-foreground-400 leading-relaxed">
								{market.description}
							</Typography>
						)}
					</div>

					<div className="flex items-center justify-between gap-3 p-4 rounded-xl border border-primary-200/30 bg-primary-50/50 dark:border-primary-500/20 dark:bg-primary-900/20 mt-auto">
						<div className="flex">
							<div className="flex items-center justify-center mr-4 w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 text-white font-bold text-lg shadow-lg">
								{market.seller.name.charAt(0).toUpperCase()}
							</div>
							<div className="flex flex-col">
								<Typography
									component="span"
									classNameComponent="text-xs uppercase tracking-wide text-foreground-500"
								>
									{tMarkets('card.seller')}
								</Typography>

								<Typography
									component="h3"
									classNameComponent="text-lg font-semibold text-foreground"
								>
									{market.seller.name}
								</Typography>
							</div>
						</div>
						<Modal
							title={tMarkets('card.chat.title', {
								sellerName: market.seller.name,
							})}
							warningFields={[
								tMarkets('card.chat.warning_message', {
									chatName,
								}),
							]}
							confirmButtonText={tMarkets('card.chat.go_to_chat')}
							confirmButtonColor="success"
							accentItemTitle={tMarkets('card.chat.go_to_chat')}
							disabled={isOwnMarket}
							isLoading={isCreatingChat}
							TriggerComponent={({ onPress }) => {
								return (
									<Button
										isDisabled={isOwnMarket}
										onPress={onPress}
										className="p-6"
										color="primary"
									>
										<SendMessageIcon />
									</Button>
								);
							}}
							onConfirm={handleCreateAndRedirectChat}
						>
							<CustomInput
								value={chatName}
								onChange={(event) => setChatName(event.target.value)}
							/>
						</Modal>
					</div>
				</div>
			</div>
		</div>
	);
};
