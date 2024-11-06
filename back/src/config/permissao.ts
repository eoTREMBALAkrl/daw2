import { prisma } from "../prisma";

export enum Roles {
    paciente = "paciente",
    responsavel = "responsavel"
}

export async function getResponsible(idPaciente:number,idUsuario:number): Promise <boolean>{
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

export async function verificaResponsavel(idUsuario: number, idPaciente: number): Promise<boolean> {
    return await getResponsible(idPaciente, idUsuario) || idUsuario === idPaciente;
}