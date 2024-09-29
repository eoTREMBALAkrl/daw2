import { z } from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { prisma } from '../../prisma';

export const updateHistoricoRoutes: FastifyPluginAsyncZod = async function (app) {
    app.put("/historico", {
        schema: {
            body: z.object({
                id: z.coerce.number(),
                idPrescricao: z.number().optional(),
                dataAtual: z.date().optional(),
            }),
        }
    }, async (req) => {
        const { id, idPrescricao, dataAtual} = req.body

        await prisma.historico.update({
            where: {
                id
            },
            data: {
                idPrescricao,
                dataAtual
            }
        });
    })
};