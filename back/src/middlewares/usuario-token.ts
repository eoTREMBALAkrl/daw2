import { FastifyReply, FastifyRequest } from 'fastify';
import { verificaToken } from "../config/jwtConfig";
import { JwtPayload } from 'jsonwebtoken';

export const autenticarToken = async (
    req: FastifyRequest & { user?: string | JwtPayload },
    res: FastifyReply
): Promise<void> => {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];

    if (!token) {
        return res.status(401).send({ message: 'Token não fornecido' });
    }

    try {
        const user = verificaToken(token);
        req.user = user;
    } catch (error) {
        return res.status(403).send({ message: 'Token inválido' });
    }
};