import { z } from 'zod';
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { prisma } from "../../prisma";


export const createRemedioRoutes: FastifyPluginAsyncZod = async function (app) {
    app.post("/remedio", {
        schema: {
            body: z.object({
                nome: z.string(),
                funcao: z.string(),
                dosagem: z.string(),
            }),
        }
    }, async (req) => {
        const { nome, funcao, dosagem } = req.body;

        await prisma.remedio.create({
            data: {
                nome,
                funcao,
                dosagem
            }
        });
    });
};