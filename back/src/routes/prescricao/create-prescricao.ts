import { z } from 'zod';
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { prisma } from "../../prisma";
import { autenticarToken } from "../../middlewares/usuario-token";
import { permissaoUsuario } from "../../middlewares/permissao-token";


export const createPrescricaoRoutes: FastifyPluginAsyncZod = async function (app) {
    app.post("/prescricao", {
        preHandler: [autenticarToken, permissaoUsuario],
        schema: {
            body: z.object({
                idUsuario: z.number(),
                idRemedio: z.number(),
                observacao: z.string().optional(),
                frequencia: z.number(),
                dataInicio: z.date(),
                dataFim: z.date(),
            }),

            response: {
                200: z.object({
                    message: z.string()
                }).describe("Prescricao criado com sucesso")
            },
            tags:["Prescricao"],
            summary: 'Criar prescricao',
            description: 'Rota de criação de prescricao',

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
        return {
            message: "Prescricao criado com sucesso!"
        }
    });
};