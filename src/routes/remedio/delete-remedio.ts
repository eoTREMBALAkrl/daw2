import { z } from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { prisma } from '../../prisma';

export const deleteRemedioRoutes: FastifyPluginAsyncZod = async function (app) {
    app.delete("/remedio", {
        schema: {
            body: z.object({
                id: z.coerce.number()
            }),
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
    })
};