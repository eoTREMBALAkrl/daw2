import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { blacklistToken } from '../../config/jwtConfig';

export const logoutUsuarioRoutes: FastifyPluginAsyncZod = async function (app) {
    app.post("/logout", {
        schema: {
            tags: ['Autenticação'],
            summary: 'Deslogar usuário',
            description: 'Desloga o usuário da aplicação',
        }
    }, async (req, res) => {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return {
                message: "Token não informado"
            }
        }

        blacklistToken(token);

        return {
            message: "Usuário deslogado com sucesso!",
        }
    });
};