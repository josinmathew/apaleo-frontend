export interface Users {
    users: User[];
}

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    fullAddress?: string;
    address?: Address;
}

export interface Address {
    address: string;
    city: string;
    postalCode: string;
}