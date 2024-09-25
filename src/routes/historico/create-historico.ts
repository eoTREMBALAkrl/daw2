import { z } from 'zod';
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { prisma } from "../../prisma";


export const createHistoricoRoutes: FastifyPluginAsyncZod = async function (app) {
    app.post("/historico", {
        schema: {
            body: z.object({
                idPrescricao: z.number(),
                dataAtual: z.date(),
            }),
        }
    }, async (req) => {
        const { idPrescricao, dataAtual } = req.body;

        await prisma.remedio.create({
            data: {
                idPrescricao,
                dataAtual
            }
        });
    });
};