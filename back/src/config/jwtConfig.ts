import jwt from 'jsonwebtoken';
import { env } from "../env";

export const blacklist = new Set<string>();

export const geraToken = (id:number) => {
return jwt.sign({ id }, env.JWT_SECRET, { expiresIn: '1h' });
}

export const verificaToken = (token:string) => {
    if (blacklist.has(token)){
        throw new Error('Token inválido');
    }
    return jwt.verify(token, env.JWT_SECRET);
}

export const blacklistToken = (token:string) => {
    blacklist.add(token);
 }