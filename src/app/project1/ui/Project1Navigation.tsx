'use client';

import { useEffect, useState } from 'react';

const sections = ['home', 'team', 'menu', 'space', 'promotions', 'contacts'];

export const Project1Navigation = () => {
	const [activeSection, setActiveSection] = useState('home');

	// Отслеживание активной секции при скролле
	useEffect(() => {
		const findScrollContainer = () => {
			// Ищем скроллируемый контейнер
			const containers = document.querySelectorAll(
				'[class*="overflow-y-auto"]',
			);
			return containers[0] as HTMLElement | null;
		};

		const handleScroll = () => {
			const container = findScrollContainer();
			if (!container) return;

			const navHeight = 80;
			const activationZone = navHeight + 150; // Зона активации (ниже навигации)
			const containerRect = container.getBoundingClientRect();

			// Собираем информацию о всех видимых секциях
			const visibleSections = sections
				.map((sectionId) => {
					const section = document.getElementById(sectionId);
					if (!section) return null;

					const sectionRect = section.getBoundingClientRect();
					const sectionTopRelative = sectionRect.top - containerRect.top;
					const sectionBottomRelative = sectionRect.bottom - containerRect.top;

					return {
						id: sectionId,
						top: sectionTopRelative,
						bottom: sectionBottomRelative,
						height: sectionRect.height,
					};
				})
				.filter((section) => section !== null) as Array<{
				id: string;
				top: number;
				bottom: number;
				height: number;
			}>;

			if (visibleSections.length === 0) return;

			// Находим секцию, которая находится в зоне активации
			// Проверяем от конца к началу, чтобы выбрать последнюю подходящую
			for (let i = visibleSections.length - 1; i >= 0; i--) {
				const section = visibleSections[i];
				// Секция активна, если её верх находится выше зоны активации
				if (section.top <= activationZone) {
					setActiveSection(section.id);
					return;
				}
			}

			// Если мы в самом верху, активируем первую секцию
			if (container.scrollTop < 50) {
				setActiveSection(sections[0]);
			}
		};

		const container = findScrollContainer();
		if (container) {
			// Небольшая задержка, чтобы секции успели отрендериться
			const initTimeout = setTimeout(() => {
				handleScroll();
			}, 200);

			// Используем requestAnimationFrame для более плавного отслеживания
			let rafId: number | null = null;
			const throttledHandleScroll = () => {
				if (rafId) return;
				rafId = requestAnimationFrame(() => {
					handleScroll();
					rafId = null;
				});
			};
			
			container.addEventListener('scroll', throttledHandleScroll, { passive: true });
			
			return () => {
				clearTimeout(initTimeout);
				if (rafId) cancelAnimationFrame(rafId);
				container.removeEventListener('scroll', throttledHandleScroll);
			};
		}
	}, []);

	// Плавная прокрутка для якорей
	useEffect(() => {
		const findScrollContainer = () => {
			const containers = document.querySelectorAll(
				'[class*="overflow-y-auto"]',
			);
			return containers[0] as HTMLElement | null;
		};

		const handleClick = (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			const link = target.closest('a[href^="#"]') as HTMLAnchorElement;
			if (link) {
				e.preventDefault();
				const id = link.getAttribute('href')?.slice(1);
				if (id) {
					const element = document.getElementById(id);
					const container = findScrollContainer();
					if (element && container) {
						const navHeight = 80;
						// Вычисляем позицию элемента относительно контейнера
						const containerRect = container.getBoundingClientRect();
						const elementRect = element.getBoundingClientRect();
						const elementPosition = 
							elementRect.top - containerRect.top + container.scrollTop - navHeight;
						container.scrollTo({
							top: elementPosition,
							behavior: 'smooth',
						});
					}
				}
			}
		};

		document.addEventListener('click', handleClick);
		return () => document.removeEventListener('click', handleClick);
	}, []);

	return (
		<nav className="fixed top-0 left-0 right-0 z-[9999] bg-black backdrop-blur-md shadow-2xl border-b-2 border-amber-400/30">
			<div className="container mx-auto px-4 py-4">
				<ul className="flex flex-wrap justify-center gap-4 md:gap-8">
					<li>
						<a
							href="#home"
							className={`transition-colors duration-300 font-medium px-3 py-2 rounded-md ${
								activeSection === 'home'
									? 'text-white bg-amber-600'
									: 'text-white hover:text-amber-400'
							}`}
						>
							Главная
						</a>
					</li>
					<li>
						<a
							href="#team"
							className={`transition-colors duration-300 font-medium px-3 py-2 rounded-md ${
								activeSection === 'team'
									? 'text-white bg-amber-600'
									: 'text-white hover:text-amber-400'
							}`}
						>
							Команда
						</a>
					</li>
					<li>
						<a
							href="#menu"
							className={`transition-colors duration-300 font-medium px-3 py-2 rounded-md ${
								activeSection === 'menu'
									? 'text-white bg-amber-600'
									: 'text-white hover:text-amber-400'
							}`}
						>
							Меню
						</a>
					</li>
					<li>
						<a
							href="#space"
							className={`transition-colors duration-300 font-medium px-3 py-2 rounded-md ${
								activeSection === 'space'
									? 'text-white bg-amber-600'
									: 'text-white hover:text-amber-400'
							}`}
						>
							Пространство
						</a>
					</li>
					<li>
						<a
							href="#promotions"
							className={`transition-colors duration-300 font-medium px-3 py-2 rounded-md ${
								activeSection === 'promotions'
									? 'text-white bg-amber-600'
									: 'text-white hover:text-amber-400'
							}`}
						>
							Акции
						</a>
					</li>
					<li>
						<a
							href="#contacts"
							className={`transition-colors duration-300 font-medium px-3 py-2 rounded-md ${
								activeSection === 'contacts'
									? 'text-white bg-amber-600'
									: 'text-white hover:text-amber-400'
							}`}
						>
							Контакты
						</a>
					</li>
				</ul>
			</div>
		</nav>
	);
};
