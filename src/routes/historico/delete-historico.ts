import { z } from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { prisma } from '../../prisma';

export const deleteHistoricoRoutes: FastifyPluginAsyncZod = async function (app) {
    app.delete("/historico", {
        schema: {
            body: z.object({
                id: z.coerce.number()
            }),
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
    })
};