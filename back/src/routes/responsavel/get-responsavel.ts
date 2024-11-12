import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { prisma } from "../../prisma";
import { z } from "zod";
import { autenticarToken } from "../../middlewares/usuario-token";
import { permissaoUsuario } from "../../middlewares/permissao-token";

export const getResponsavelRoutes: FastifyPluginAsyncZod = async function (app) {
    app.get("/responsavel/:idPaciente", {
        preHandler: [autenticarToken, permissaoUsuario],
        schema: {
            params: z.object({
                idPaciente: z.coerce.number(),
            }),
            response: {
                200: z.object({
                    responsavel: z.array(
                        z.object({
                            id: z.number(),
                            nome: z.string(),
                            email: z.string(),
                        })
                    ).describe("Lista de Responsáveis")
                }),
            },
            tags: ["Responsável"],
            summary: "Listar Responsáveis",
            description: "Esta rota retorna uma lista de responsáveis de um paciente.",
        },
    }, async (req, res) => {
        const { idPaciente } = req.params;

        try {
            const responsavel = await prisma.paciente_responsavel.findMany({
                where: { idPaciente },
                include: {
                    responsavel: {
                        select: {
                            id: true,
                            nome: true,
                            email: true,
                        },
                    },
                },
            });

            const result = responsavel.map(r => ({
                id: r.responsavel.id,
                nome: r.responsavel.nome,
                email: r.responsavel.email,
            }));

            return { responsavel: result };
        } catch (error) {
            console.error("Erro ao buscar responsáveis:", error);
        }
    });
};
