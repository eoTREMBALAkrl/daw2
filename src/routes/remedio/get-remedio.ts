import { z } from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { prisma } from '../../prisma';

export const getRemedioRoute: FastifyPluginAsyncZod = async function (app) {
    app.get("/remedio", async () => {
        const remedio = await prisma.remedio.findMany();

        return {
            remedio
        }
    })
};