import { z } from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { prisma } from '../../prisma';

export const deletePrescricaoRoutes: FastifyPluginAsyncZod = async function (app) {
    app.delete("/prescricao", {
        schema: {
            body: z.object({
                id: z.coerce.number()
            }),
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
    })
};