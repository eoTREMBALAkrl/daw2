import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { prisma } from "../../prisma";
import z from "zod";
import { autenticarToken } from "../../middlewares/usuario-token";
import { permissaoUsuario } from "../../middlewares/permissao-token";

export const createResponsibleRoutes: FastifyPluginAsyncZod = async function (app) {
    app.post("/responsible", {
        preHandler: [permissaoUsuario, permissaoUsuario],
        schema: {
            body: z.object({
                idPaciente: z.coerce.number(),
                idUsuario: z.coerce.number(),
            }),
            response: {
                200: z.object({
                    message: z.string()
                }).describe("Responsável criado com sucesso")
            },
            tags:["Responsável"],
            summary: 'Criar um responsável',
            description: 'Esta rota criar um responsável no banco de dados.',
        }
    }, async (req) => {
        const { idPaciente, idUsuario } = req.body;

        await prisma.paciente_responsavel.create({
            data: {
                idPaciente: idPaciente,
                idResponsavel: idUsuario
            }
        });

        return {
            message: "Responsável criado com sucesso"
        };
    });
};