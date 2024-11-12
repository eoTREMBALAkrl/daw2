import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { prisma } from "../../prisma";
import z from "zod";
import { autenticarToken } from "../../middlewares/usuario-token";
import { permissaoUsuario } from "../../middlewares/permissao-token";

export const getHistoricoRoutes: FastifyPluginAsyncZod = async function (app) {
  app.get("/historico/:idPrescricao", {
    preHandler: [autenticarToken, permissaoUsuario],
    schema: {
      params: z.object({
        idPrescricao: z.coerce.number()
      }),
      response: {
        200: z.object({
          historico: z.array(
            z.object({
              idRemedio: z.number(),
              nomeRemedio: z.string(),
              dosagem: z.string(),
              funcao: z.string(),
              observacao: z.string().nullable(),
              frequencia: z.number(),
              dataInicio: z.date(),
              data: z.date() // Novo campo de data do histórico
            })
          )
        }).describe("Lista de históricos")
      },
      tags: ["Histórico"],
      summary: "Listar históricos",
      description: "Esta rota retorna uma lista de históricos cadastrados no banco de dados."
    }
  }, async (req) => {
    const { idPrescricao } = req.params;

    const historicoResponse = await prisma.historico.findMany({
      where: {
        status: true,
        idPrescricao,
      },
      include: {
        prescricao: {
          select: {
            frequencia: true,
            observacao: true,
            dataInicio: true,
            remedio: {
              select: {
                id: true,
                nome: true,
                dosagem: true,
                funcao: true,
              }
            }
          }
        }
      }
    });

    const historico = historicoResponse.map(hist => {
      const { prescricao } = hist;
      return {
        idRemedio: prescricao.remedio.id,
        nomeRemedio: prescricao.remedio.nome,
        dosagem: prescricao.remedio.dosagem,
        funcao: prescricao.remedio.funcao,
        observacao: prescricao.observacao,
        frequencia: prescricao.frequencia,
        dataInicio: prescricao.dataInicio,
        data: hist.data // Adicionando o campo data do registro de histórico
      };
    });

    return {
      historico
    };
  });
};
