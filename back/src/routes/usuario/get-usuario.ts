import { z } from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { prisma } from '../../prisma';
import { autenticarToken } from '../../middlewares/usuario-token';
import { permissaoUsuario } from "../../middlewares/permissao-token";

export const getUsuarioRoutes: FastifyPluginAsyncZod = async function (app) {
    app.get("/usuario",{
        preHandler: [autenticarToken, permissaoUsuario],
        schema:{
            response:{
                200: z.object({
                    usuario: z.array(z.object({
                        id: z.number(),
                        nome: z.string(),
                        email: z.string(),
                        status: z.boolean()
                    }))
                }).describe("Lista de usuários")
            },
            tags: ["Usuário"],
            summary: "Listar usuário",
            description: "Rota de listar usuário"
        }
    }, async () => {
        const usuario = await prisma.usuario.findMany({
            where: {
                status: true
            }
        });

        return {
            usuario
        }
    })
};