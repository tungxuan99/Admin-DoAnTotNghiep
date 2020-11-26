import { Role } from "./role";
export class User {
    id: number;
    username: string;
    password: string;
    hoTen: string;
    level: Role;
    token?: string;
}