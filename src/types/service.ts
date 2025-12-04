export type ServiceCategory = 
  | 'coiffure'
  | 'tressage'
  | 'perruques'
  | 'tissages'
  | 'soins'
  | 'manucure'
  | 'beaute';

export interface Service {
  id: string;
  name: string;
  description: string;
  category: ServiceCategory;
  price: number;
  duration: number; // en minutes
  image: string;
  popular?: boolean;
  includes?: string[];
}
