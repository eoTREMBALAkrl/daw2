import { z } from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { prisma } from '../../prisma';

export const deleteRemedioRoutes: FastifyPluginAsyncZod = async function (app) {
    app.delete("/remedio", {
        schema: {
            body: z.object({
                id: z.coerce.number()
            }),
            
            response: {
                200: z.object({
                    message: z.string()
                }).describe("Remedio deletado com sucesso")
            },
            tags:["Remedio"],
            summary: 'Deletar remedio',
            description: 'Rota de deletar remedio',
            
        }
    }, async (req) => {
        const { id } = req.body

        await prisma.remedio.update({
            where: {
                id
            },
            data: {
                status: false,
            }
        });
        return {
            message: "Remedio deletado com sucesso!"
        }
    })
};