export interface QuickAccessItem {
	href: string;
	titleKey: string;
	descriptionKey: string;
	buttonKey: string;
	additionalInfoKey: string;
	gradient: string;
	borderColor: string;
	hoverShadow: string;
	buttonColor: string;
}

export interface FeatureItem {
	titleKey: string;
	descriptionKey: string;
	detailsKeys: string;
}

export interface StatisticItem {
	labelKey: string;
	value: string;
	icon: string;
	gradient: string;
	color: string;
}

export interface HowItWorksStep {
	step: number;
	titleKey: string;
	descriptionKey: string;
	color: string;
}

export interface HowItWorksPath {
	titleKey: string;
	descriptionKey: string;
	icon: string;
	gradient: string;
	steps: HowItWorksStep[];
}

export interface UseCaseItem {
	titleKey: string;
	descriptionKey: string;
	icon: string;
	gradient: string;
}
