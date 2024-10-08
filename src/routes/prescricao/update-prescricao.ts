import { z } from 'zod';
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { prisma } from "../../prisma";


export const updatePrescricaoRoutes: FastifyPluginAsyncZod = async function (app) {
    app.put("/prescricao", {
        schema: {
            body: z.object({
                id: z.coerce.number().optional(),
                idUsuario: z.number().optional(),
                idRemedio: z.number().optional(),
                observacao: z.string().optional(),
                frequencia: z.number().optional(),
                dataInicio: z.date().optional(),
                dataFim: z.date().optional(),
            }),

            response: {
                200: z.object({
                    message: z.string()
                }).describe("Prescricao atualizado com sucesso")
            },
            tags:["Prescricao"],
            summary: 'atualizar prescricao',
            description: 'Rota de atualizar prescricao',

        }
    }, async (req) => {
        const { id,idUsuario, idRemedio, observacao,frequencia,dataInicio,dataFim } = req.body;

        await prisma.prescricao.update({
            where: {
                id
            },
            data: {
                idUsuario,
                idRemedio,
                observacao,
                frequencia,
                dataInicio,
                dataFim
            }
        });
        return {
            message: "Prescricao atualizado com sucesso!"
        }
    });
};