import { z } from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { prisma } from '../../prisma';
import { AES, enc } from "crypto-js"
import { env } from '../../env';
import { geraToken } from '../../config/jwtConfig';
import { decrypt } from '../../config/crypto';
import { StatusCodes } from 'http-status-codes';

export const loginUsuarioRoutes: FastifyPluginAsyncZod = async function (app) {
    app.post("/login", {
        schema: {
            body: z.object({
                email: z.string().email(),
                senha: z.string(),
            }),
            response: {
                200: z.object({
                    message: z.string(),
                    token: z.string()
                }).describe('Esquema de resposta bem-sucedida'),
                404: z.string().describe('Usuário não encontrado'),
            },
            tags: ['Autenticação'],
            summary: "Login de usuário",
            description: "Realiza o login de um usuário com jwt",
        }
    }, async (req, res) => {
        const { email, senha } = req.body;

        const usuario = await prisma.usuario.findUnique({
            where:{
                email
            }
        })
        

        if(!usuario){
            return res.status(404).send("Usuário não encontrado")
        }


        if (!usuario || senha !== decrypt(usuario.senha)) {
            return res.status(
                StatusCodes.NOT_FOUND
            ).send("Usuário não encontrado");
        }
      
        const token = geraToken(usuario.id);

        return {
            message: "logado",
            token
        }
    });
};