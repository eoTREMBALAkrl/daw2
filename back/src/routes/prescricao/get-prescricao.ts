// src/routes/prescricao.ts

import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { prisma } from "../../prisma";
import { z } from "zod";
import { autenticarToken } from "../../middlewares/usuario-token";
import { permissaoUsuario } from "../../middlewares/permissao-token";

export const getPrescricaoRoutes: FastifyPluginAsyncZod = async function (app) {
    app.get("/prescricao/:idPaciente",{ 
        preHandler: [autenticarToken, permissaoUsuario],
        schema:{
            params: z.object({
                idPaciente: z.coerce.number()
            }),
            response: {
                200: z.object({
                    prescricao: z.array(
                        z.object({
                          id: z.number(),
                          nome: z.string(),
                          observacao: z.string().nullable(),
                          frequencia: z.number(),
                          dataInicio: z.date(),
                          dataFim: z.date(),
                          paciente: z.object({
                            id: z.number(),
                            nome: z.string()
                          }),
                          remedio: z.object({
                            id: z.number(),
                            nome: z.string(),
                            funcao: z.string(),
                            dosagem: z.string()
                          })
                        })
                    )
                }).describe("Lista de prescrições")
            },
            tags: ["Prescrição"],
            summary: "Listar prescrições",
            description: "Esta rota retorna uma lista de prescrições cadastradas no banco de dados."
        }
    }, async (req, res) => {
        const { idPaciente } = req.params;

        const dependents = await prisma.paciente_responsavel.findMany({
            where: { idResponsavel: idPaciente },
            select: { idPaciente: true }
        });
        const dependentIds = dependents.map(dependent => dependent.idPaciente);

        const prescricaoResponse = await prisma.prescricao.findMany({
            where: {
                status: true,
                idUsuario: {
                    in: [idPaciente, ...dependentIds]
                },
                remedio: {
                    status: true
                }
            },
            include: {
                remedio: {
                    select: {
                        id: true,
                        nome: true,
                        funcao: true,
                        dosagem: true
                    }
                },
                usuario: {
                    select: {
                        id: true,
                        nome: true
                    }
                }
            }
        });

        const prescricao = prescricaoResponse.map((prescricao) => {
            return {
                id: prescricao.id,
                nome: prescricao.usuario.nome,
                observacao: prescricao.observacao,
                frequencia: prescricao.frequencia,
                dataInicio: prescricao.dataInicio,
                dataFim: prescricao.dataFim,
                paciente: {
                    id: prescricao.usuario.id,
                    nome: prescricao.usuario.nome
                },
                remedio: {
                    id: prescricao.remedio.id,
                    nome: prescricao.remedio.nome,
                    funcao: prescricao.remedio.funcao,
                    dosagem: prescricao.remedio.dosagem
                }
            };
        });

        return res.status(200).send({ prescricao });
    });
};
