export interface Need {
    user_id: string;
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

export interface Needs {
    items: Need[];
}

export interface NeedUpdate {
    user_id?: string;
    type?: string;
    frequency?: number;
    duration?: number;
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
    county_id: number;
    county_name: string;
    town_name: string;
}

export interface Towns {
    items: Town[];
}

export interface Offer {
    user_id: string;
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

export interface Offers {
    items: Offer[];
}

export interface OfferUpdate {
    user_id?: string;
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

export interface User {
    password: string;
    name: string;
    email: string;
    phone: string;
    birthday: string;
    sex: string;
    videourl: string;
    viewers: string[];
    pending: string[];
}

export interface IdUser {
    _id: string;
    password: string;
    name: string;
    email: string;
    phone: string;
    birthday: string;
    sex: string;
    videourl: string;
    bio: string;
    viewers: string[];
    pending: string[];
}

export interface IdUsers {
    items: IdUser[];
}

export interface IdUserUpdate {
    _id?: string;
    password?: string;
    name?: string;
    email?: string;
    phone?: string;
    birthday?: string;
    sex?: string;
    videourl?: string;
    bio?: string;
    viewers?: string[];
    pending?: string[];
}

export interface UserWithNeeds extends IdUser {
    needs: Need[];
    offers: Offer[];
}

export interface NeedWithUser extends Need {
    user: User;
}
