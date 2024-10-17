import { z } from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { prisma } from '../../prisma';

export const deletePrescricaoRoutes: FastifyPluginAsyncZod = async function (app) {
    app.delete("/prescricao", {
        schema: {
            body: z.object({
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
        const { id } = req.body

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