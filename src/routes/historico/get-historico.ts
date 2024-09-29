import { z } from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { prisma } from '../../prisma';

export const getHistoricoRoutes: FastifyPluginAsyncZod = async function (app) {
    app.get("/historico", async () => {
        const historico = await prisma.historico.findMany();

        return {
            historico
        }
    })
};