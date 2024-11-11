import { z } from 'zod';
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { prisma } from "../../prisma";
import { autenticarToken } from "../../middlewares/usuario-token";
import { permissaoUsuario } from "../../middlewares/permissao-token";


export const createHistoricoRoutes: FastifyPluginAsyncZod = async function (app) {
    app.post("/historico", {
        preHandler: [autenticarToken, permissaoUsuario],
        schema: {
            body: z.object({
                idPrescricao: z.coerce.number().describe("Identificador da prescrição"),
            }),

            response: {
                200: z.object({
                    message: z.string()
                }).describe("Historico criado com sucesso")
            },
            tags:["Historico"],
            summary: 'Criar historico',
            description: 'Rota de criação de historico',

        }
    }, async (req) => {
        const { idPrescricao} = req.body;

        await prisma.historico.create({
            data: {
                idPrescricao
            }
        });
        return {
            message: "Historico criado com sucesso!"
        }
    });
};