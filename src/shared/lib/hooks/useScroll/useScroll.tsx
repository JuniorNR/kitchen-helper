import { useEffect, useState } from 'react';

type ScrollTarget = Element | string | null | undefined;

export const useScroll = (direction: 'x' | 'y', target?: ScrollTarget) => {
	const [scrollPosition, setScrollPosition] = useState<number>(0);
	useEffect(() => {
		let el: Element | Window | null = window;
		if (typeof target === 'string') {
			el = document.querySelector(target);
		} else if (target instanceof Element) {
			el = target;
		}

		const read = () => {
			if (!el || el === window) {
				setScrollPosition(direction === 'x' ? window.scrollX : window.scrollY);
				return;
			}
			const node = el as HTMLElement;
			setScrollPosition(direction === 'x' ? node.scrollLeft : node.scrollTop);
		};

		read();
		const listener: EventListener = () => read();
		(el || window).addEventListener('scroll', listener, { passive: true });
		return () => {
			(el || window).removeEventListener('scroll', listener);
		};
	}, [direction, target]);

	return scrollPosition;
};
