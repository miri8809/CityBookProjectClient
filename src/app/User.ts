import { Child } from './Child';

export class User{
    FirstName:string;
    LastName:string;
    TZ:string;
    NumChildren:number;
    HMO:string;
    DateBorn:Date;
    Male:boolean;
    Female:boolean;
    children:Array<Child>;
   
}