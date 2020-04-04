export type Category = 'shopping' | 'teaching' | 'pets';

export interface RegistrationStep {
    url: string;
    title: string;
}

export interface RegistrationType {
    help: boolean;
    category: Category;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface ShoppingData {
    zip: string;
    frequency: number;
    description?: string;
    city: string;
    payment: {
        transfer: boolean;
        cash: boolean;
    };
}
export interface PersonalData {
    name: string;
    email: string;
    password: string;
    phone: string;
}

export interface BioData {
    bio?: string;
    video?: {
        length: number;
    };
}

export interface RegistrationData {
    shopping?: ShoppingData;
    personal?: PersonalData;
    bio?: BioData;
    login?: LoginData
}
