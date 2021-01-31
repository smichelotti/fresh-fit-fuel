export interface Menu {
  id?: string;
  name: string;
  startTime: Date;
  endTime: Date;
  menuItemIds: string[];
}