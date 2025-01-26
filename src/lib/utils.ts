import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const objectCategories = [
  { label: 'Tools', value: 'TOOLS' },
  { label: 'Garden', value: 'GARDEN' },
  { label: 'Automotive', value: 'AUTOMOTIVE' },
  { label: 'Red Wine', value: 'RED_WINE' },
  { label: 'White Wine', value: 'WHITE_WINE' },
  { label: 'Sparkling Wine', value: 'SPARKLING_WINE' },
  { label: 'Textiles', value: 'TEXTILES' },
  { label: 'Tableware', value: 'TABLEWARE' },
  { label: 'Glassware', value: 'GLASSWARE' },
  { label: 'Cookware', value: 'COOKWARE' },
  { label: 'Maintenance', value: 'MAINTENANCE' },
  { label: 'Equipment', value: 'EQUIPMENT' },
  { label: 'Consumable', value: 'CONSUMABLE' },
  { label: 'Other', value: 'OTHER' },
]