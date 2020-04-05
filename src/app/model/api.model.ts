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
    user: IdUser;
}


export interface OfferWitthUser extends Offer {
    user: IdUser;
}

export class UserBuilder implements NeedWithUser {
    user_id: string = '';
    type: string = '';
    frequency: number = 2;
    duration: number = 0;
    description: string = '';
    location: any = { zip: 1032, city: 'Budapest' };
    level: string = null;
    subjects: string[] = [];
    flatSpec: any = null;
    paymentMethod: string = 'Készpénzzel';
    user = {
        _id: 'string',
        password: '',
        name: 'Name',
        email: 'email',
        phone: 'phone',
        birthday: '1978-12-31',
        sex: 'male',
        videourl: '',
        viewers: [],
        bio: '',
        pending: []
    }
    constructor (name: string, email: string, phone: string) {
        this.user.name = name;
        this.user.email = email;
        this.user.phone = phone;
    }
}