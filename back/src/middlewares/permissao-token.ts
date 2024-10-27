import { z } from "zod";
import { verificaResponsavel} from "../config/permissao";
import { FastifyReply, FastifyRequest } from "fastify";
import { verificaToken } from "../config/jwtConfig";

const getPrescricaoSchema = z.object({
    idPaciente: z.coerce.number(),
});

export const permissaoUsuario = async (
    req: FastifyRequest,
    res: FastifyReply
): Promise<void> => {
    const token = req.headers["authorization"]?.split(" ")[1] as string;
    const { idPaciente } = getPrescricaoSchema.parse(req.params);
    const { id } = verificaToken(token);

    if (id === idPaciente || await verificaResponsavel(idPaciente, id)) {
        return; 
    }

    return res.status(403).send({ message: 'Usuário não autorizado' });
};