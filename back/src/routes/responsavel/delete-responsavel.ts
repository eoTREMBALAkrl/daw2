import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { prisma } from "../../prisma";
import z from "zod";
import { autenticarToken } from "../../middlewares/usuario-token";
import { permissaoUsuario } from "../../middlewares/permissao-token";

export const deleteResponsavelRoutes: FastifyPluginAsyncZod = async function (app) {
    app.delete("/responsavel", {
        preHandler: [autenticarToken, permissaoUsuario],
        schema: {
            body: z.object({
                idPaciente: z.coerce.number(),
                idUsuario: z.coerce.number(),
            }),
            response: {
                201: z.object({
                    message: z.string()
                }).describe("Responsável deletado com sucesso!")
            },
            tags: ["Responsável"],
            summary: 'Deletar um responsável',
            description: 'Esta rota deleta um responsável do banco de dados.',
        }
    }, async (req) => {
        const { idPaciente, idUsuario } = req.body;

        await prisma.paciente_responsavel.delete({
            where: {
                idPaciente_idResponsavel:{
                    idResponsavel: idUsuario,
                    idPaciente: idPaciente
                }
            }
        });

        return {
            message: "Responsável deletado com sucesso"
        };
    });
};