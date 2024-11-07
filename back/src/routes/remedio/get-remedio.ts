import { z } from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { prisma } from '../../prisma';
import { autenticarToken } from "../../middlewares/usuario-token";
import { permissaoUsuario } from "../../middlewares/permissao-token";

export const getRemedioRoutes: FastifyPluginAsyncZod = async function (app) {
    app.get("/remedio", {
        preHandler: [autenticarToken],
        schema: {
            response: {
                200: z.object({
                    remedios: z.array(z.object({
                        id: z.number(),
                        nome: z.string(),
                        funcao: z.string(),
                        dosagem: z.string(),
                        status: z.boolean(),
                    }))
                }).describe("Lista de remédios")
            },
            tags: ["Remédio"],
            summary: "Listar remédios",
            description: "Rota para listar todos os remédios ativos"
        }
    }, async (req, res) => {
        try {
            // Busca todos os remédios com status ativo
            const remedios = await prisma.remedio.findMany({
                where: { status: true }
            });

            return res.status(200).send({ remedios });
        } catch (error) {
            console.error("Erro ao buscar remédios:", error);
        }
    });
};