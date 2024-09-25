import { z } from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { prisma } from '../../prisma';

export const updateUsuarioRoutes: FastifyPluginAsyncZod = async function (app) {
    app.put("/usuario", {
        schema: {
            body: z.object({
                id: z.coerce.number(),
                nome: z.string().optional(),
                email: z.string().email().optional(),
                senha: z.string().optional(),
                data: z.coerce.date().optional(),
            }),
        }
    }, async (req) => {
        const { id, nome, email, senha, data } = req.body

        await prisma.usuario.update({
            where: {
                id
            },
            data: {
                nome,
                email,
                senha,
                data
            }
        });
    })
};