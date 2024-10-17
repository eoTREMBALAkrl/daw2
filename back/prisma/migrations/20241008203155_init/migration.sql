-- CreateTable
CREATE TABLE "usuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "data" DATETIME NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "remedio" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "funcao" TEXT NOT NULL,
    "dosagem" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "prescricao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idUsuario" INTEGER NOT NULL,
    "idRemedio" INTEGER NOT NULL,
    "observacao" TEXT,
    "frequencia" INTEGER NOT NULL,
    "dataInicio" DATETIME NOT NULL,
    "dataFim" DATETIME NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "prescricao_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "prescricao_idRemedio_fkey" FOREIGN KEY ("idRemedio") REFERENCES "remedio" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "historico" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idPrescricao" INTEGER NOT NULL,
    "dataAtual" DATETIME NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "historico_idPrescricao_fkey" FOREIGN KEY ("idPrescricao") REFERENCES "prescricao" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");
