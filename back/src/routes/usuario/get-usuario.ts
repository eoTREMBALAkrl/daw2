import z from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { prisma } from '../../prisma';
import { autenticarToken } from '../../middlewares/usuario-token';
import { permissaoUsuario } from "../../middlewares/permissao-token";

export const getUsuarioRoutes: FastifyPluginAsyncZod = async function (app) {
    app.get("/usuario/:id", {
        preHandler: [autenticarToken, permissaoUsuario],
        schema: {
            params: z.object({
                id: z.coerce.number()
            }),
            response: {
                200: z.object({
                    usuario: z.object({
                        id: z.number(),
                        nome: z.string(),
                        email: z.string(),
                        status: z.boolean()
                    }).nullable()
                }).describe("Dados do usuário")
            },
            tags: ["Usuário"],
            summary: "Listar usuário",
            description: "Rota de listar usuário"
        }
    }, async (request) => {
        const { id } = request.params;

        const usuario = await prisma.usuario.findUnique({
            where: {
                id,
                status: true
            }
        });

        return {
            usuario
        }
    });
};