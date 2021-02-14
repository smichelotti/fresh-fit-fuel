export interface MenuItem {
    id?: string,
    name: string,
    description: string,
    carbs: number,
    protein: number,
    fat: number,
    calories: number,
    imageUrl: string,
    category: string,
    price: number,
    priceOptions: PriceOption[]
}

export interface PriceOption {
  label: string;
  priceAdj: number;
}