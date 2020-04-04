export interface SomeResult {
    field: number;
}

export interface Needs {
    type: string;
    frequency: number;
    duration: number;
    description: string;
    location: any;
    level: string;
    subjects: string[];
    flatSpec: any;
    paymentMethod: string;
}

export interface NeedsUpdate {
    type?: string;
    frequency?: number;
    duration?: number
    description?: string;
    location?: any;
    level?: string;
    subjects?: string[];
    flatSpec?: any;
    paymentMethod?: string;
}

export interface Town {
    town_id: number;
    ksh_id: number;
    zipcode: number;
    country_id: number;
    country_name: string;
    town_name: string;
}

export interface Towns {
    items: Town[];
}

export interace Offers {
    type: string;
    description: string;
    location: any;
    level: string;
    flatSpec: any;
    paymentMethod: string;
    hasCar: boolean;
    experience: string;
    skills: string[];
}

export interace OffersUpdate {
    type?: string;
    description?: string;
    location?: any;
    level?: string;
    flatSpec?: any;
    paymentMethod?: string;
    hasCar?: boolean;
    experience?: string;
    skills?: string[];
}
