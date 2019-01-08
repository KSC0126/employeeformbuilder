import {Iskills} from '../models/iskills'
export interface IEmployee {
    id : number;
    fullName: string;
    email: string;
    phone? : number;
    contactPreference: string;
    Iskills: Iskills[];
}
