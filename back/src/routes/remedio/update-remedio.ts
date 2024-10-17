import { z } from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { prisma } from '../../prisma';

export const updateRemedioRoutes: FastifyPluginAsyncZod = async function (app) {
    app.put("/remedio", {
        schema: {
            body: z.object({
                id: z.coerce.number(),
                nome: z.string().optional(),
                funcao: z.string().email().optional(),
                dosagem: z.string().optional(),
            }),

            response: {
                200: z.object({
                    message: z.string()
                }).describe("Remedio atualizado com sucesso")
            },
            tags:["Remedio"],
            summary: 'Atualizar remedio',
            description: 'Rota de atualizar remedio',
        }
    }, async (req) => {
        const { id, nome, funcao, dosagem} = req.body

        await prisma.remedio.update({
            where: {
                id
            },
            data: {
                nome,
                funcao,
                dosagem
            }
        });

        return {
            message: "Remedio atualizado com sucesso!"
        }
    })
};