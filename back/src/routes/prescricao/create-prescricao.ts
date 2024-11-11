import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { prisma } from "../../prisma";
import z from "zod";
import { autenticarToken } from "../../middlewares/usuario-token";
import { permissaoUsuario } from "../../middlewares/permissao-token";

export const createPrescricaoRoutes: FastifyPluginAsyncZod = async function (app) {
    app.post("/prescricao", {
        preHandler: [autenticarToken, permissaoUsuario],
        schema: {
            body: z.object({
                idUsuario: z.coerce.number().describe("ID do usuário"),
                idRemedio: z.coerce.number().describe("ID do medicamento"),
                frequencia: z.coerce.number().describe("Horas de frequência"),
                observacao: z.string().optional().describe("Notas").optional(),
                dataInicio: z.coerce.date().describe("Data de início"),
                dataFim: z.coerce.date().describe("Data de término"),
            }),
            response: {
                201: z.object({
                    message: z.string()
                }).describe("Prescrição criada com sucesso")
            },
            tags:["Prescrição"],
            summary: 'Criar uma prescrição',
            description: 'Esta rota cria uma prescrição no banco de dados.',
        }
    }, async (req) => {
        const { idUsuario, idRemedio, frequencia, observacao, dataInicio, dataFim  } = req.body;

        await prisma.prescricao.create({
            data: {
              idUsuario, 
              idRemedio, 
              frequencia, 
              observacao, 
              dataInicio, 
              dataFim,
            }
        });

        return {
            message: "Prescrição criada com sucesso"
        };
    });
};