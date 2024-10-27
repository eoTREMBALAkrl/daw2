import { z } from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { prisma } from '../../prisma';
import { autenticarToken } from "../../middlewares/usuario-token";
import { permissaoUsuario } from "../../middlewares/permissao-token";

export const getPrescricaoRoutes: FastifyPluginAsyncZod = async function (app) {
    app.get("/prescricao/:idPaciente",{
        preHandler: [autenticarToken, permissaoUsuario],
        schema:{
            params:z.object({
                idPaciente: z.coerce.number()
            }),
            response:{
                200: z.object({
                    prescricao: z.array(z.object({
                        id: z.number(),
                        idRemedio: z.number(),
                        idUsuario: z.number(),
                        status: z.boolean()                     
                    }))
                }).describe("Lista de prescrições")
            },
            tags: ["Prescricao"],
            summary: "Listar prescrição",
            description: "Rota de listar prescrição"
        }
    }, async (req) => {

        const { idPaciente } = req.params

        const prescricao = await prisma.prescricao.findMany({
            where:{
                status: true,
                idUsuario:idPaciente
            }
        });

        return {
            prescricao
        };
    });
};