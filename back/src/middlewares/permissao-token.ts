import { z } from "zod";
import { verificaResponsavel} from "../config/permissao";
import { FastifyReply, FastifyRequest } from "fastify";
import { verificaToken } from "../config/jwtConfig";
import { prisma } from '../prisma';
import { StatusCodes } from "http-status-codes";

const idPacienteSchema = z.object({
    idPaciente: z.coerce.number(),
});

const idPrescricaoSchema = z.object({
    idPrescricao: z.coerce.number(),
});

const idHistoricoSchema = z.object({
    idHistorico: z.coerce.number(),
});


export const permissaoUsuario = async (
    req: FastifyRequest,
    res: FastifyReply
): Promise<void> => {
    function checkRoute(route: string, method: string): boolean {
        return req.routeOptions.url === route && req.method === method;
    }
    const token = req.headers["authorization"]?.split(" ")[1] as string;
    const { id } = verificaToken(token);

    if (checkRoute("/prescricao/:idPaciente", "GET")) {
        {
            const { idPaciente } = idPacienteSchema.parse(req.params);
            
            if (await verificaResponsavel(id, idPaciente)) {
                return;
            }

            return res.status(StatusCodes.FORBIDDEN).send({ message: "Rota não permitida" });
        }
    }

    if (checkRoute("/historico/:idPrescricao", "GET")) {
        const { idPrescricao } = idPrescricaoSchema.parse(req.params);
        
        const user = await prisma.prescricao.findUnique({
            where: {
                id: idPrescricao
            },
            select: {
                idUsuario: true
            }
        });

        if(!user) return res.status(StatusCodes.NOT_FOUND).send({ message: "Prescrição não encontrada" });

        if (await verificaResponsavel(id, user.idUsuario)) {
            return;
        }

        return res.status(StatusCodes.FORBIDDEN).send({ message: "Rota não permitida" });
    }

    if (checkRoute("/responsavel/:idPaciente", "GET")) {
        const { idPaciente } = idPacienteSchema.parse(req.params);

        if (await verificaResponsavel(id, idPaciente)) {
            return;
        }

        return res.status(StatusCodes.FORBIDDEN).send({ message: "Rota não permitida" });
    }

    if (checkRoute("/historico/:idPrescricao", "GET")) {
        const { idPrescricao } = idPrescricaoSchema.parse(req.params);
        
        const user = await prisma.prescricao.findUnique({
            where: {
                id: idPrescricao
            },
            select: {
                idUsuario: true
            }
        });

        if(!user) return res.status(StatusCodes.NOT_FOUND).send({ message: "Prescrição não encontrada" });

        if (await verificaResponsavel(id, user.idUsuario)) {
            return;
        }

        return res.status(StatusCodes.FORBIDDEN).send({ message: "Rota não permitida" });
    }


    if (checkRoute("/usuario/:id", "GET")) {
        const { id: userId } = z.object({
            id: z.coerce.number()
        }).parse(req.params);

       if (await verificaResponsavel(id, userId)) {
           return;
        }

       return res.status(StatusCodes.FORBIDDEN).send({ message: "Rota não permitida" });
    }

    return;
};