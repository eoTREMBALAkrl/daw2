import { z } from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { prisma } from '../../prisma';
import { AES, enc } from "crypto-js"
import { env } from '../../env';
import { geraToken } from '../../config/jwtConfig';

export const loginUsuarioRoutes: FastifyPluginAsyncZod = async function (app) {
    app.post("/login", {
        schema: {
            body: z.object({
                email: z.string().email().describe('E-mail do usuário'),
                senha: z.string().describe('Senha do usuário'),
            }),
            response: {
                200: z.object({
                    message: z.string(),
                    token: z.string()
                }).describe('Esquema de resposta bem-sucedida'),
                404: z.string().describe('Usuário não encontrado'),
                401: z.string().describe('Usuário não encontrado')
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

        const senhaDescriptografada = AES.decrypt(usuario.senha, env.CRYPTO_SECRET).toString(enc.Utf8);

        if (!usuario || senha !== senhaDescriptografada) {
            return res.status(401).send('Credenciais inválidas');
        }
      
        const token = geraToken(usuario.id);

        return {
            message: "Usuário criado com sucesso!",
            token
        }
    });
};