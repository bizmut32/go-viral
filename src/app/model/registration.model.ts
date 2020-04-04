export type Category = 'shopping' | 'teaching' | 'pets';

export interface RegistrationStep {
    url: string;
    title: string;
}

export interface RegistrationType {
    help: boolean;
    category: Category;
}

export interface ShoppingData {
    zip: string;
    frequency: number;
    recurrent: boolean;
    description: string;
}