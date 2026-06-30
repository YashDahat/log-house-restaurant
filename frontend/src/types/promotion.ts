export interface Promotion {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  startDate: string; // ISO 8601 date string
  endDate: string;   // ISO 8601 date string
  isActive: boolean;
}
