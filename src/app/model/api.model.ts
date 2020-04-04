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