import { z } from 'zod';
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { prisma } from "../../prisma";
import { autenticarToken } from "../../middlewares/usuario-token";
import { permissaoUsuario } from "../../middlewares/permissao-token";


export const createPrescricaoRoutes: FastifyPluginAsyncZod = async function (app) {
    app.post("/prescricao", {
        preHandler: [autenticarToken],
        schema: {
          body: z.object({
            idUsuario: z.number(),
            idRemedio: z.number(),
            observacao: z.string().optional(),
            frequencia: z.number(),
            dataInicio: z.string(),
            dataFim: z.string(),
          }),
          response: {
            201: z.object({
              message: z.string(),
              prescricao: z.object({
                id: z.number(),
                idUsuario: z.number(),
                idRemedio: z.number(),
                observacao: z.string().nullable(),
                frequencia: z.number(),
                dataInicio: z.string(),
                dataFim: z.string(),
                status: z.boolean(),
              })
            })
          },
          tags: ["Prescrição"],
          summary: "Adicionar prescrição",
          description: "Rota para adicionar uma nova prescrição"
        }
      }, async (req, res) => {
        const { idUsuario, idRemedio, observacao, frequencia, dataInicio, dataFim } = req.body;
    
        try {
          const novaPrescricao = await prisma.prescricao.create({
            data: {
              idUsuario,
              idRemedio,
              observacao,
              frequencia,
              dataInicio: new Date(dataInicio),
              dataFim: new Date(dataFim),
              status: true,
            }
          });
        } catch (error) {
          console.error("Erro ao adicionar prescrição:", error);
        }
      });
};