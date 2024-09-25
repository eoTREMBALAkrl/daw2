import { z } from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { prisma } from '../../prisma';

export const getPrescricaoRoute: FastifyPluginAsyncZod = async function (app) {
    app.get("/prescricao", async () => {
        const prescricao = await prisma.prescricao.findMany();

        return {
            prescricao
        }
    })
};