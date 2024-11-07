import { z } from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { prisma } from '../../prisma';
import { autenticarToken } from '../../middlewares/usuario-token';

export const updateRemedioRoutes: FastifyPluginAsyncZod = async function (app) {
    app.put("/remedio/:id", {
        preHandler: [autenticarToken],
        schema: {
            params: z.object({
                id: z.coerce.number()
            }),
            body: z.object({
                nome: z.string(),
                funcao: z.string(),
                dosagem: z.string(),
            }),
            response: {
                200: z.object({
                    message: z.string(),
                    remedio: z.object({
                        id: z.number(),
                        nome: z.string(),
                        funcao: z.string(),
                        dosagem: z.string(),
                        status: z.boolean(),
                    })
                }).describe("Dados do remédio atualizado")
            },
            tags: ["Remédio"],
            summary: "Editar remédio",
            description: "Rota para editar um remédio específico"
        }
    }, async (req, res) => {
        const { id } = req.params;
        const { nome, funcao, dosagem } = req.body;

        try {
            const remedioAtualizado = await prisma.remedio.update({
                where: { 
                    id: Number(id) 
                },
                data: { nome,
                      funcao,
                      dosagem },
            });

            return res.status(200).send({
                message: "Remédio atualizado com sucesso",
                remedio: remedioAtualizado
            });
        } catch (error) {
            console.error("Erro ao atualizar remédio:", error);
        }
    });
};