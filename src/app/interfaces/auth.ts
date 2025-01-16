export interface LoginUser {
    id: number;
    nombre: string;
    email: string;
    firstLogin: number;
    auth: boolean;
    role: number;
    token: string;
}

export interface User {
    id: number;
    nombre: string;
    email: string;
    role: number;
}

export class Token {
    id: number;
    role: number;
    name: string;
    iat: any;
}