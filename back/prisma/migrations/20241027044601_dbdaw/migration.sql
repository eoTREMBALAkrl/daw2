-- CreateTable
CREATE TABLE "paciente_responsavel" (
    "idPaciente" INTEGER NOT NULL,
    "idResponsavel" INTEGER NOT NULL,

    PRIMARY KEY ("idPaciente", "idResponsavel"),
    CONSTRAINT "paciente_responsavel_idPaciente_fkey" FOREIGN KEY ("idPaciente") REFERENCES "usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "paciente_responsavel_idResponsavel_fkey" FOREIGN KEY ("idResponsavel") REFERENCES "usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "paciente_responsavel_idPaciente_idResponsavel_key" ON "paciente_responsavel"("idPaciente", "idResponsavel");
