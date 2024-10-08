import { z } from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { prisma } from '../../prisma';

export const getHistoricoRoutes: FastifyPluginAsyncZod = async function (app) {
    app.get("/historico",{
        schema:{
            response:{
                200: z.object({
                    historico: z.array(z.object({
                        id: z.number(),
                        idPrescricao: z.number(),
                        status: z.boolean()
                    }))
                }).describe("Lista de historico")
            },
            tags: ["Historico"],
            summary: "Listar historico",
            description: "Rota de listar historico"
        }
    },async () => {
        const historico = await prisma.historico.findMany({
            where: {
                status: true
            }
        });
        return {
            historico
        };
    });
};