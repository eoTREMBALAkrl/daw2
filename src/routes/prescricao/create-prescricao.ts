import { z } from 'zod';
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { prisma } from "../../prisma";


export const createPrescricaoRoutes: FastifyPluginAsyncZod = async function (app) {
    app.post("/prescricao", {
        schema: {
            body: z.object({
                idUsuario: z.number(),
                idRemedio: z.number(),
                observacao: z.string().optional(),
                frequencia: z.number(),
                dataInicio: z.date(),
                dataFim: z.date(),
            }),
        }
    }, async (req) => {
        const { idUsuario, idRemedio, observacao,frequencia,dataInicio,dataFim } = req.body;

        await prisma.prescricao.create({
            data: {
                idUsuario,
                idRemedio,
                observacao,
                frequencia,
                dataInicio,
                dataFim
            }
        });
    });
};