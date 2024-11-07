import { z } from 'zod';
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { prisma } from "../../prisma";
import { autenticarToken } from '../../middlewares/usuario-token';


export const updatePrescricaoRoutes: FastifyPluginAsyncZod = async function (app) {
    app.put("/prescricao/:id", {
        preHandler: [autenticarToken],
        schema: {
          params: z.object({
            id: z.coerce.number()
          }),
          body: z.object({
            idUsuario: z.number(),
            idRemedio: z.number(),
            observacao: z.string().nullable(),
            frequencia: z.number(),
            dataInicio: z.string(),
            dataFim: z.string(),
          }),
          response: {
            200: z.object({
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
          summary: "Editar prescrição",
          description: "Rota para editar uma prescrição específica"
        }
      }, async (req, res) => {
        const { id } = req.params;
        const { idUsuario, idRemedio, observacao, frequencia, dataInicio, dataFim } = req.body;
    
        try {
          const prescricaoAtualizada = await prisma.prescricao.update({
            where: { id: Number(id) },
            data: {
              idUsuario,
              idRemedio,
              observacao,
              frequencia,
              dataInicio: new Date(dataInicio),
              dataFim: new Date(dataFim),
            }
          });
        } catch (error) {
          console.error("Erro ao atualizar prescrição:", error);
          
        }
      });
};