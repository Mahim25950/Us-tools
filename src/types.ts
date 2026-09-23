export type ToolCategory =
  | 'all'
  | 'calculators'
  | 'finance'
  | 'taxes'
  | 'housing'
  | 'time'
  | 'converters'
  | 'pdf'
  | 'business'
  | 'health'
  | 'education'
  | 'security'
  | 'other';

export interface ToolItem {
  id: string;
  name: string;
  category: ToolCategory;
  description: string;
  iconName: string;
  badge?: string;
  popular?: boolean;
  buttonText?: string;
  iconBg?: string;
  iconColor?: string;
}

export interface CategoryCardItem {
  id: ToolCategory;
  name: string;
  count: string;
  iconName: string;
  iconBg: string;
  iconColor: string;
}

