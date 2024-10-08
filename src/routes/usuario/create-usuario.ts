import { z } from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { prisma } from '../../prisma';
import { AES } from "crypto-js";
import { env } from '../../env';

export const createUsuarioRoutes: FastifyPluginAsyncZod = async function (app) {
    app.post("/usuario", {
        schema: {
            body: z.object({
                nome: z.string(),
                email: z.string().email(),
                senha: z.string(),
                data: z.coerce.date(),
            }),

            response: {
                201: z.object({
                    message: z.string()
                }).describe("usuário criado com sucesso"),
            },
            tags: ['Usuário'],
            summary: 'Criar usuário',
            description: 'Rota de criação de usuário',

        }
    }, async (req) => {
        const { nome, email, senha, data } = req.body

        const senhaCriptografada = AES.encrypt(senha, env.CRYPTO_SECRET).toString()

        await prisma.usuario.create({
            data: {
                nome,
                email,
                senha: senhaCriptografada,
                data
            }
        });

        return {
            message: "Usuário criado com sucesso!"
        }

    })
};