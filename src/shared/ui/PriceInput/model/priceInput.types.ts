export interface PriceInputProps {
	value: number;
	onPriceChange: (value: number) => void;
	priceUnit: string;
	onPriceUnitChange: (value: string) => void;
}
