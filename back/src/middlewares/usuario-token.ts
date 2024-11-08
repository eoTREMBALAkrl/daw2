// src/middlewares/usuario-token.ts
import { FastifyReply, FastifyRequest } from 'fastify';
import { verificaToken } from '../config/jwtConfig';
import { JwtPayload } from 'jsonwebtoken';

interface AuthenticatedRequest extends FastifyRequest {
  user?: { id: number };
}

export const autenticarToken = async (
  req: AuthenticatedRequest,
  res: FastifyReply
): Promise<void> => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return res.status(401).send({ message: 'Token não fornecido' });
  }

  try {
    const decodedToken = verificaToken(token) as JwtPayload & { id: number }; // Verifica e decodifica o token
    if (!decodedToken || !decodedToken.id) {
      throw new Error('Token inválido');
    }

    req.user = { id: decodedToken.id }; // Adiciona `user` ao objeto `req`
  } catch (error) {
    return res.status(403).send({ message: 'Token inválido' });
  }
};
