import { z } from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { prisma } from '../../prisma';

export const deleteUsuarioRoutes: FastifyPluginAsyncZod = async function (app) {
    app.delete("/usuario", {
        schema: {
            body: z.object({
                id: z.coerce.number()
            }),
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
    })
};