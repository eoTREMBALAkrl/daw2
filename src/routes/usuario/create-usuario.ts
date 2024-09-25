import { z } from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { prisma } from '../../prisma';


export const createUsuarioRoutes: FastifyPluginAsyncZod = async function (app) {
    app.post("/usuario", {
        schema: {
            body: z.object({
                nome: z.string(),
                email: z.string().email(),
                senha: z.string(),
                data: z.coerce.date(),
            }),
        }
    }, async (req) => {
        const { nome, email, senha, data } = req.body

        await prisma.usuario.create({
            data: {
                nome,
                email,
                senha,
                data
            }
        });
    })
};