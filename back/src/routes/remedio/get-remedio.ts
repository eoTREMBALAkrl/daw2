import { z } from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { prisma } from '../../prisma';
import { autenticarToken } from "../../middlewares/usuario-token";
import { permissaoUsuario } from "../../middlewares/permissao-token";

export const getRemedioRoutes: FastifyPluginAsyncZod = async function (app) {
    app.get("/remedio",{
        preHandler: [autenticarToken, permissaoUsuario],
        schema:{
            response:{
                200: z.object({
                    remedio: z.array(z.object({
                        id: z.number(),
                        nome: z.string(),
                        funcao: z.string(),
                        dosagem: z.string(),
                        status: z.boolean()
                    }))
                }).describe("Lista remedio")
            },
            tags: ["Remedio"],
            summary: "Listar remedio",
            description: "Rota de listar remedio"
        }
    },async () => {
        const remedio = await prisma.remedio.findMany({
            where:{
                status: true
            }
        });

        return {
            remedio
        };
    });
};