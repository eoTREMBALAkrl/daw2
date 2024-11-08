// src/routes/prescricao.ts
import { z } from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { prisma } from '../../prisma';
import { autenticarToken } from "../../middlewares/usuario-token";

export const prescricaoRoutes: FastifyPluginAsyncZod = async function (app) {
  app.get("/prescricao", {
    preHandler: [autenticarToken], // Middleware que autentica o token
    schema: {
      response: {
        200: z.array(z.object({
          id: z.number(),
          remedio: z.object({
            id: z.number(),
            nome: z.string(),
            dosagem: z.string()
          }),
          observacao: z.string().nullable(),
          frequencia: z.number(),
          dataInicio: z.string(),
          dataFim: z.string(),
          status: z.boolean(),
        }))
      },
      tags: ["Prescrição"],
      summary: "Listar prescrições do usuário autenticado",
      description: "Rota para listar prescrições ativas do usuário logado"
    }
  }, async (req, res) => {
    const usuarioId = req.user.id; // Usuário autenticado, extraído do middleware

    try {
      const prescricoes = await prisma.prescricao.findMany({
        where: {
          idUsuario: usuarioId,
          status: true
        },
        include: {
          remedio: { select: { id: true, nome: true, dosagem: true } }
        }
      });

    } catch (error) {
      console.error("Erro ao buscar prescrições:", error);
      
      
    }
  });
};
