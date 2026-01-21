'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';

export const Project1Page = () => {
	const containerRef = useRef<HTMLDivElement>(null);

	// Используем статические ID, соответствующие навигации
	const aboutId = 'home';
	const ourTeamId = 'team';
	const menuId = 'menu';
	const spaceId = 'space';
	const promotionsId = 'promotions';
	const contactsId = 'contacts';

	return (
		<div
			ref={containerRef}
			className="relative w-full h-full overflow-y-auto overflow-x-hidden bg-black"
			style={{ scrollBehavior: 'smooth' }}
		>
			<Section
				id={aboutId}
				backgroundImage="https://avatars.mds.yandex.net/i?id=f68947a93e7dd28674d7f3c5b5dbf773_l-5733920-images-thumbs&n=13"
			>
				<div className="container mx-auto px-4 pt-24 pb-20 md:pt-32 md:pb-32">
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8 }}
						className="max-w-4xl mx-auto text-center"
					>
						<h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-2xl">
							Добро пожаловать
						</h1>
						<p className="text-xl md:text-2xl text-white/90 mb-8 drop-shadow-lg">
							Премиальная кальянная с уникальной атмосферой
						</p>
						<div className="bg-black/60 backdrop-blur-md rounded-2xl p-8 md:p-12 text-left">
							<h2 className="text-3xl md:text-4xl font-bold text-amber-400 mb-6">
								О нас
							</h2>
							<p className="text-lg text-white/90 mb-4 leading-relaxed">
								Мы создали место, где встречаются традиции и современность. Наша
								кальянная — это не просто заведение, а пространство для
								настоящего отдыха и качественного времяпрепровождения.
							</p>
							<h3 className="text-2xl font-semibold text-amber-400 mt-8 mb-4">
								Наши преимущества:
							</h3>
							<ul className="space-y-3 text-white/90">
								<li className="flex items-start">
									<span className="text-amber-400 mr-3">✓</span>
									<span>
										Премиальные табаки и смеси от ведущих мировых производителей
									</span>
								</li>
								<li className="flex items-start">
									<span className="text-amber-400 mr-3">✓</span>
									<span>Профессиональные кальянщики с многолетним опытом</span>
								</li>
								<li className="flex items-start">
									<span className="text-amber-400 mr-3">✓</span>
									<span>Уникальная атмосфера и комфортные зоны отдыха</span>
								</li>
								<li className="flex items-start">
									<span className="text-amber-400 mr-3">✓</span>
									<span>Широкий выбор напитков и закусок</span>
								</li>
							</ul>
						</div>
					</motion.div>
				</div>
			</Section>

			{/* Секция 2: Наша команда */}
			<Section
				id={ourTeamId}
				backgroundImage="https://edatop.ru/uploads/posts/2021-11/1636797249_edatop.ru_kak-nazvat-kalyannuyu1.jpg"
			>
				<div className="container mx-auto px-4 py-20 md:py-32">
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8 }}
						className="max-w-6xl mx-auto"
					>
						<h2 className="text-4xl md:text-6xl font-bold text-white text-center mb-12 drop-shadow-2xl">
							Наша команда
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
							{[
								{
									name: 'Владислав Панкриотитович',
									role: 'Главный кальянщик',
									experience: 'Опыт работы 8 лет',
									bio: 'Работал в премиальных заведениях Москвы и Санкт-Петербурга. Специализируется на авторских смесях.',
									image:
										'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
								},
								{
									name: 'Олег Куделенко',
									role: 'Менеджер зала',
									experience: 'Опыт работы 6 лет',
									bio: 'Организатор мероприятий и мастер создания уютной атмосферы. Работала в известных ресторанах города.',
									image:
										'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
								},
								{
									name: 'Руслан Черножопович',
									role: 'Бармен-миксолог',
									experience: 'Опыт работы 7 лет',
									bio: 'Создатель уникальных коктейлей. Участник международных конкурсов барменов.',
									image:
										'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
								},
							].map((member, index) => (
								<motion.div
									key={member.name}
									initial={{ opacity: 0, y: 30 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.6, delay: index * 0.2 }}
									className="bg-black/70 backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl hover:scale-105 transition-transform duration-300"
								>
									<div className="relative h-64 overflow-hidden">
										<img
											src={member.image}
											alt={member.name}
											className="w-full h-full object-cover"
										/>
									</div>
									<div className="p-6">
										<h3 className="text-2xl font-bold text-amber-400 mb-2">
											{member.name}
										</h3>
										<p className="text-lg text-white/80 mb-2">{member.role}</p>
										<p className="text-sm text-amber-300 mb-4">
											{member.experience}
										</p>
										<p className="text-white/70 leading-relaxed">
											{member.bio}
										</p>
									</div>
								</motion.div>
							))}
						</div>
					</motion.div>
				</div>
			</Section>

			{/* Секция 3: Меню и цены */}
			<Section
				id={menuId}
				backgroundImage="https://mir-s3-cdn-cf.behance.net/project_modules/fs/6cf06d114741727.6041ff3d2bbf7.png"
			>
				<div className="container mx-auto px-4 py-20 md:py-32">
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8 }}
						className="max-w-4xl mx-auto"
					>
						<h2 className="text-4xl md:text-6xl font-bold text-white text-center mb-12 drop-shadow-2xl">
							Меню и цены
						</h2>
						<div className="bg-black/70 backdrop-blur-md rounded-2xl p-8 md:p-12 shadow-2xl">
							<div className="space-y-6">
								<div className="border-b border-amber-400/30 pb-6">
									<div className="flex justify-between items-center">
										<div>
											<h3 className="text-2xl font-semibold text-amber-400 mb-2">
												Кальян на стандартной чаше
											</h3>
											<p className="text-white/70">
												Классические табаки, качественная чаша
											</p>
										</div>
										<span className="text-3xl font-bold text-white">900 ₽</span>
									</div>
								</div>
								<div className="border-b border-amber-400/30 pb-6">
									<div className="flex justify-between items-center">
										<div>
											<h3 className="text-2xl font-semibold text-amber-400 mb-2">
												Кальян на премиум чаше
											</h3>
											<p className="text-white/70">
												Премиальные табаки, улучшенная чаша
											</p>
										</div>
										<span className="text-3xl font-bold text-white">
											1100 ₽
										</span>
									</div>
								</div>
								<div className="pb-6">
									<div className="flex justify-between items-center">
										<div>
											<h3 className="text-2xl font-semibold text-amber-400 mb-2">
												Кальян на фрукте
											</h3>
											<p className="text-white/70">
												Эксклюзивная подача на ананасе, грейпфруте или другом
												фрукте
											</p>
										</div>
										<span className="text-3xl font-bold text-white">
											1500 ₽
										</span>
									</div>
								</div>
							</div>
							<div className="mt-8 pt-8 border-t border-amber-400/30">
								<p className="text-center text-amber-300 text-lg">
									* Актуальные акции и спецпредложения смотрите в разделе{' '}
									<a
										href="#promotions"
										className="underline hover:text-amber-400 transition-colors"
									>
										Акции
									</a>
								</p>
							</div>
						</div>
					</motion.div>
				</div>
			</Section>

			{/* Секция 4: Пространство и планировка */}
			<Section
				id={spaceId}
				backgroundImage="https://p2.zoon.ru/preview/zTdmd7O_70nJscL-_M1cIw/2400x1500x75/1/0/1/original_58ddbe4c8d5122d9118b4572_59297569d57e9.jpg"
			>
				<div className="container mx-auto px-4 py-20 md:py-32">
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8 }}
						className="max-w-6xl mx-auto"
					>
						<h2 className="text-4xl md:text-6xl font-bold text-white text-center mb-12 drop-shadow-2xl">
							Пространство и планировка
						</h2>
						<div className="bg-black/70 backdrop-blur-md rounded-2xl p-8 md:p-12 shadow-2xl mb-8">
							<p className="text-lg text-white/90 mb-6 leading-relaxed">
								Наше заведение расположено в историческом центре города, в
								здании XIX века, которое было бережно отреставрировано с
								сохранением архитектурных особенностей. Уникальная атмосфера
								старины гармонично сочетается с современным комфортом.
							</p>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
							{[
								{
									title: 'Основной зал',
									description:
										'Просторное помещение для отдыха, курения кальянов и употребления напитков. Уютная атмосфера с мягким освещением и комфортной мебелью.',
								},
								{
									title: 'Social Lounge',
									description:
										'Специальная зона для нетворкинга. Используйте систему браслетов или табличек («готов к общению» / «не беспокоить») для комфортного общения.',
								},
								{
									title: 'VIP-комната',
									description:
										'Изолированное помещение для приватных мероприятий. Вместимость до 12 человек. Идеально для корпоративов, дней рождений и особых случаев.',
								},
								{
									title: 'Барная стойка',
									description:
										'Современная барная стойка с широким ассортиментом напитков. Наши бармены приготовят для вас авторские коктейли и безалкогольные напитки.',
								},
							].map((zone, index) => (
								<motion.div
									key={zone.title}
									initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
									whileInView={{ opacity: 1, x: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.6, delay: index * 0.1 }}
									className="bg-black/70 backdrop-blur-md rounded-2xl p-6 shadow-xl hover:scale-105 transition-transform duration-300"
								>
									<div>
										<h3 className="text-2xl font-bold text-amber-400 mb-3">
											{zone.title}
										</h3>
										<p className="text-white/80 leading-relaxed">
											{zone.description}
										</p>
									</div>
								</motion.div>
							))}
						</div>
						<div className="mt-8 bg-black/70 backdrop-blur-md rounded-2xl p-6 text-center">
							<p className="text-white/80">
								Санузлы расположены на первом этаже, рядом с барной стойкой
							</p>
						</div>
					</motion.div>
				</div>
			</Section>

			{/* Секция 5: Акции и спецпредложения */}
			<Section
				id={promotionsId}
				backgroundImage="https://mir-s3-cdn-cf.behance.net/project_modules/fs/778ef452846419.591e810391035.jpg"
			>
				<div className="container mx-auto px-4 py-20 md:py-32">
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8 }}
						className="max-w-5xl mx-auto"
					>
						<h2 className="text-4xl md:text-6xl font-bold text-white text-center mb-12 drop-shadow-2xl">
							Акции и спецпредложения
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
							{[
								{
									title: 'Дневные предложения',
									description:
										'Скидки до 20% на все кальяны с 12:00 до 17:00 в будние дни. Идеальное время для дневного отдыха!',
									badge: '12:00 - 17:00',
								},
								{
									title: 'Формат "1+1"',
									description:
										'Каждый вторник — второй кальян в подарок! При заказе премиум кальяна получайте стандартный бесплатно.',
									badge: 'Вторник',
								},
								{
									title: 'Общее снижение цен',
									description:
										'Специальная акция: скидка 100-200 рублей на все позиции меню. Действует до конца месяца!',
									badge: 'Ограничено',
								},
								{
									title: 'Мероприятия',
									description:
										'Каждую пятницу и субботу: живая музыка, тематические вечера, специальные гости. Следите за анонсами в наших соцсетях!',
									badge: 'Пт-Сб',
								},
							].map((promo, index) => (
								<motion.div
									key={promo.title}
									initial={{ opacity: 0, scale: 0.9 }}
									whileInView={{ opacity: 1, scale: 1 }}
									viewport={{ once: true }}
									transition={{ duration: 0.5, delay: index * 0.1 }}
									className="bg-black/70 backdrop-blur-md rounded-2xl p-6 shadow-2xl hover:scale-105 transition-transform duration-300 border border-gray-700/50"
								>
									<div className="p-6 h-full">
										<div className="flex justify-between items-start mb-4">
											<h3 className="text-2xl font-bold text-white">
												{promo.title}
											</h3>
											<span className="bg-amber-500 backdrop-blur-md px-3 py-1 rounded-full text-sm font-semibold text-black">
												{promo.badge}
											</span>
										</div>
										<p className="text-white/90 leading-relaxed">
											{promo.description}
										</p>
									</div>
								</motion.div>
							))}
						</div>
					</motion.div>
				</div>
			</Section>

			{/* Секция 6: Контакты и информация */}
			<Section
				id={contactsId}
				backgroundImage="https://avatars.mds.yandex.net/i?id=6c19c9a859b17651396b353d8b0bb89e_l-5866055-images-thumbs&n=13"
			>
				<div className="container mx-auto px-4 py-20 md:py-32">
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8 }}
						className="max-w-4xl mx-auto"
					>
						<h2 className="text-4xl md:text-6xl font-bold text-white text-center mb-12 drop-shadow-2xl">
							Контакты и информация
						</h2>
						<div className="bg-black/70 backdrop-blur-md rounded-2xl p-8 md:p-12 shadow-2xl">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
								<div>
									<h3 className="text-2xl font-bold text-amber-400 mb-4">
										Адрес
									</h3>
									<p className="text-lg text-white/90 mb-2">
										г. Москва, ул. Примерная, д. 10
									</p>
									<p className="text-white/70">
										Ближайшее метро: Примерная (5 минут пешком)
									</p>
								</div>
								<div>
									<h3 className="text-2xl font-bold text-amber-400 mb-4">
										Часы работы
									</h3>
									<div className="space-y-2 text-white/90">
										<p>Понедельник - Четверг: 12:00 - 02:00</p>
										<p>Пятница - Суббота: 12:00 - 04:00</p>
										<p>Воскресенье: 14:00 - 02:00</p>
									</div>
								</div>
							</div>
							<div className="border-t border-amber-400/30 pt-8">
								<h3 className="text-2xl font-bold text-amber-400 mb-4 text-center">
									Связь с нами
								</h3>
								<div className="flex flex-wrap justify-center gap-6">
									<a
										href="tel:+79991234567"
										className="bg-gray-700 hover:bg-gray-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-300"
									>
										+7 (999) 123-45-67
									</a>
									<a
										href="https://instagram.com"
										target="_blank"
										rel="noopener noreferrer"
										className="bg-gray-700 hover:bg-gray-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-300"
									>
										Instagram
									</a>
									<a
										href="https://vk.com"
										target="_blank"
										rel="noopener noreferrer"
										className="bg-gray-700 hover:bg-gray-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-300"
									>
										VKontakte
									</a>
									<a
										href="https://telegram.org"
										target="_blank"
										rel="noopener noreferrer"
										className="bg-gray-700 hover:bg-gray-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-300"
									>
										Telegram
									</a>
								</div>
							</div>
							<div className="mt-8 pt-8 border-t border-amber-400/30">
								<div className="bg-amber-400/10 rounded-xl p-6 text-center">
									<p className="text-white/90 text-lg">
										Ждем вас в гости! Бронирование столиков по телефону или
										через социальные сети.
									</p>
								</div>
							</div>
						</div>
					</motion.div>
				</div>
			</Section>
		</div>
	);
};

const Section = ({
	id,
	backgroundImage,
	children,
}: {
	id: string;
	backgroundImage: string;
	children: React.ReactNode;
}) => {
	const sectionRef = useRef<HTMLDivElement>(null);

	return (
		<section
			id={id}
			ref={sectionRef}
			className={`relative min-h-screen flex items-center justify-center overflow-hidden ${
				id === 'home' ? 'pt-0' : ''
			}`}
			style={{ scrollMarginTop: '80px' }}
		>
			{/* Фоновое изображение */}
			<div className="absolute inset-0 z-0">
				<div
					className="absolute inset-0 bg-cover bg-center bg-no-repeat"
					style={{
						backgroundImage: `url(${backgroundImage})`,
						transform: 'scale(1.1)',
					}}
				/>
				<div className="absolute inset-0 bg-black/75" />
			</div>

			{/* Контент */}
			<div className="relative z-10 w-full">{children}</div>
		</section>
	);
};
