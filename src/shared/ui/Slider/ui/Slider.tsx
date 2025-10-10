import type { FC } from 'react';
import { A11y, EffectCube, Navigation, Pagination } from 'swiper/modules';
import { Swiper, type SwiperProps } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-cube';
import type { SliderProps } from '../model/slider.types';

export const Slider: FC<SwiperProps & SliderProps> = ({
	isOpen = false,
	...props
}) => {
	return (
		<Swiper
			{...props}
			modules={[A11y, Navigation, Pagination, EffectCube]}
			navigation
			pagination={{ clickable: true, dynamicBullets: true }}
			cubeEffect={{
				shadow: false,
			}}
		/>
	);
};
