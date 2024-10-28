import { z } from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { prisma } from '../../prisma';
import { autenticarToken } from "../../middlewares/usuario-token";
import { permissaoUsuario } from "../../middlewares/permissao-token";

export const deleteUsuarioRoutes: FastifyPluginAsyncZod = async function (app) {
    app.delete("/usuario", {
        preHandler: [autenticarToken, permissaoUsuario],
        schema: {
            body: z.object({
                id: z.coerce.number()
            }),

            response: {
                201: z.object({
                    message: z.string()
                }).describe("Usuário deletado com sucesso!")
            },

            tags:["Usuário"],
            summary: 'Deletar usuário',
            description: 'Rota de deletar usuário',

        }
    }, async (req) => {
        const { id } = req.body

        await prisma.usuario.update({
            where: {
                id
            },
            data: {
                status: false,
            }
        });

        return {
            message: "Usuário deletado com sucesso"
        };

    })
};