import { prisma } from "../prisma";

export enum Roles {
    paciente = "paciente",
    responsavel = "responsavel"
}

export async function verificaResponsavel(idPaciente:number,usuarioId:number): Promise <boolean>{
    const response = await prisma.paciente_responsavel.findUnique({
        where: {
            idPaciente_idResponsavel: {
                idPaciente,
                idResponsavel: idUsuario
            }
        }
    });

    return response !== null;
}