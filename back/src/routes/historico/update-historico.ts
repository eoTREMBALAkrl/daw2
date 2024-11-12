import { z } from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { prisma } from '../../prisma';

export const updateHistoricoRoutes: FastifyPluginAsyncZod = async function (app) {
    app.put("/historico", {
        schema: {
            body: z.object({
                id: z.coerce.number(),
                idPrescricao: z.number().optional(),
                data: z.date().optional(),
            }),

            response: {
                200: z.object({
                    message: z.string()
                }).describe("Historico atualizado com sucesso")
            },
            tags:["Historico"],
            summary: 'atualizar historico',
            description: 'Rota de atualizar historico',

        }
    }, async (req) => {
        const { id, idPrescricao, data} = req.body

        await prisma.historico.update({
            where: {
                id
            },
            data: {
                idPrescricao,
                data
            }
        });
        return {
            message: "Historico atualizado com sucesso!"
        }
    })
};