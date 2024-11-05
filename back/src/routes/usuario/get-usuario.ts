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
    }, async (req, res) => {
        try {
            const { id } = req.params;
            console.log("ID recebido1:", id);
            const usuario = await prisma.usuario.findUnique({
                where: {
                    id: Number(id),
                }
            });
         
            // Verifica se o usuário foi encontrado e está ativo
            if (!usuario || !usuario.status) {
                return res.status(404).send({ error: "Usuário não encontrado ou inativo" });
            }

            return res.status(200).send({
                usuario: {
                    id: usuario.id,
                    nome: usuario.nome,
                    email: usuario.email,
                    status: usuario.status
                }
            });
        } catch (error) {
            console.error("Erro ao buscar usuário:", error);
            return res.status(500).send({ error: "Erro interno no servidor" });
        }
    });
};
