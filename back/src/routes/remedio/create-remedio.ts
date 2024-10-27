import { z } from 'zod';
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { prisma } from "../../prisma";
import { autenticarToken } from "../../middlewares/usuario-token";
import { permissaoUsuario } from "../../middlewares/permissao-token";


export const createRemedioRoutes: FastifyPluginAsyncZod = async function (app) {
    app.post("/remedio", {
        schema: {
            body: z.object({
                nome: z.string(),
                funcao: z.string(),
                dosagem: z.string(),
            }),
            response: {
                200: z.object({
                    message: z.string()
                }).describe("Remedio criado com sucesso")
            },
            tags:["Remedio"],
            summary: 'Criar remedio',
            description: 'Rota de criação de remedio',
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
        return {
            message: "Remedio criado com sucesso!"
        }
    });
};