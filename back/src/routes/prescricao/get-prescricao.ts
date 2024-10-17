import { z } from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { prisma } from '../../prisma';

export const getPrescricaoRoutes: FastifyPluginAsyncZod = async function (app) {
    app.get("/prescricao",{
        schema:{
            response:{
                200: z.object({
                    prescricao: z.array(z.object({
                        id: z.number(),
                        idRemedio: z.number(),
                        idUsuario: z.number(),
                        status: z.boolean()                     
                    }))
                }).describe("Lista de prescrições")
            },
            tags: ["Prescricao"],
            summary: "Listar prescrição",
            description: "Rota de listar prescrição"
        }
    }, async () => {
        const prescricao = await prisma.prescricao.findMany({
            where:{
                status: true
            }
        });

        return {
            prescricao
        };
    });
};