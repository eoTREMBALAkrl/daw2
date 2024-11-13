import { FastifyInstance } from 'fastify';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUI from '@fastify/swagger-ui';
import { jsonSchemaTransform } from 'fastify-type-provider-zod';

export async function setupSwagger(app: FastifyInstance) {

  app.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'API de exemplo com swagger',
        version: '1.0.0',
        description: 'API para exemplo de documentação swagger',
      },
      servers: [
        {
          url: 'http://localhost:3333',
        },
      ],
    },
    transform: jsonSchemaTransform,
  });

  app.register(fastifySwaggerUI, {
    routePrefix: '/documentation',
    uiConfig: {
      docExpansion: 'none', 
      deepLinking: false,
    },
  });
}