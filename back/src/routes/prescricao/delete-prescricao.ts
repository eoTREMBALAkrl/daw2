import { z } from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { prisma } from '../../prisma';
import { autenticarToken } from "../../middlewares/usuario-token";
import { permissaoUsuario } from "../../middlewares/permissao-token";


export const deletePrescricaoRoutes: FastifyPluginAsyncZod = async function (app) {
    app.delete("/prescricao/:id", {
        preHandler: [autenticarToken, permissaoUsuario],
        schema: {
            params:z.object({
                id: z.coerce.number()
            }),
            response: {
                200: z.object({
                    message: z.string()
                }).describe("Prescricao deletado com sucesso")
            },
            tags:["Prescricao"],
            summary: 'Deletar prescricao',
            description: 'Rota de deletar prescricao',

        }
    }, async (req) => {
        const { id } = req.params;

        await prisma.prescricao.update({
            where: {
                id
            },
            data: {
                status: false,
            }
        });
        return {
            message: "Prescricao deletado com sucesso!"
        }
    })
};