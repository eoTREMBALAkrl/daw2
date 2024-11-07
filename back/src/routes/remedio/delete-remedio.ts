import { z } from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { prisma } from '../../prisma';
import { autenticarToken } from "../../middlewares/usuario-token";
import { permissaoUsuario } from "../../middlewares/permissao-token";

export const deleteRemedioRoutes: FastifyPluginAsyncZod = async function (app) {
    app.delete("/remedio/:id", {
        preHandler: [autenticarToken],
        schema: {
            params: z.object({
                id: z.coerce.number()
            }),
            response: {
                200: z.object({
                    message: z.string()
                }).describe("Confirmação de deleção lógica")
            },
            tags: ["Remédio"],
            summary: "Desativar remédio",
            description: "Rota para desativar um remédio (deleção lógica, alterando status para false)"
        }
    }, async (req, res) => {
        const { id } = req.params;

        try {
            // Tenta desativar o remédio com o ID fornecido
            const remedioDesativado = await prisma.remedio.update({
                where: { id: Number(id) },
                data: { status: false },
            });

            // Confirmação de que o remédio foi desativado
            return res.status(200).send({ message: `Remédio '${remedioDesativado.nome}' desativado com sucesso` });
        } catch (error) {
            console.error("Erro ao desativar remédio:", error);
        }
    });
};