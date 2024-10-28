import { z } from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { prisma } from '../../prisma';
import { autenticarToken } from "../../middlewares/usuario-token";
import { permissaoUsuario } from "../../middlewares/permissao-token";

export const deleteHistoricoRoutes: FastifyPluginAsyncZod = async function (app) {
    app.delete("/historico", {
        preHandler: [autenticarToken, permissaoUsuario],
        schema: {
            body: z.object({
                id: z.coerce.number()
            }),

            response: {
                200: z.object({
                    message: z.string()
                }).describe("Historico deletado com sucesso")
            },
            tags:["Historico"],
            summary: 'deletar historico',
            description: 'Rota de deletar historico',

        }
    }, async (req) => {
        const { id } = req.body

        await prisma.historico.update({
            where: {
                id
            },
            data: {
                status: false,
            }
        });

        return {
            message: "Historico deletado com sucesso!"
        }
    })
};