export interface StatsData {
  menuItemId: string;
  name: string;
  count: number;
  options: { name: string, count: number, customers: { fullName: string, quantity: number }[] }[]
}