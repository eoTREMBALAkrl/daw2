import { z } from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { prisma } from '../../prisma';

export const getUsuarioRoute: FastifyPluginAsyncZod = async function (app) {
    app.get("/usuario", async () => {
        const usuario = await prisma.usuario.findMany();

        return {
            usuario
        }
    })
};