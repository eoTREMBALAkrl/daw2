import fastify from "fastify";
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from "fastify-type-provider-zod";
import { setupSwagger } from "./config/swaggerConfig"; 
import cors from "@fastify/cors"

import { createUsuarioRoutes } from "./routes/usuario/create-usuario";
import { deleteUsuarioRoutes } from "./routes/usuario/delete-usuario";
import { updateUsuarioRoutes } from "./routes/usuario/update-usuario";
import { getUsuarioRoutes } from "./routes/usuario/get-usuario";
import { loginUsuarioRoutes } from "./routes/usuario/login-usuario";
import { logoutUsuarioRoutes } from "./routes/usuario/logout-usuario";

import {createRemedioRoutes} from "./routes/remedio/create-remedio";
import {deleteRemedioRoutes} from "./routes/remedio/delete-remedio";
import {updateRemedioRoutes} from "./routes/remedio/update-remedio";
import {getRemedioRoutes} from "./routes/remedio/get-remedio";

import {createPrescricaoRoutes} from "./routes/prescricao/create-prescricao";
import {deletePrescricaoRoutes} from "./routes/prescricao/delete-prescricao";
import {updatePrescricaoRoutes} from "./routes/prescricao/update-prescricao";
import {getPrescricaoRoutes} from "./routes/prescricao/get-prescricao";

import {createHistoricoRoutes} from "./routes/historico/create-historico";
import {getHistoricoRoutes} from "./routes/historico/get-historico";

import { createResponsavelRoutes } from "./routes/responsavel/create-responsavel";
import { deleteResponsavelRoutes } from "./routes/responsavel/delete-responsavel";

const app = fastify().withTypeProvider<ZodTypeProvider>();
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
setupSwagger(app);

app.register(cors,{
    origin:"*",
    methods:["GET", "POST", "PUT", "DELETE"]
})


app.register(createUsuarioRoutes);
app.register(deleteUsuarioRoutes);
app.register(updateUsuarioRoutes);
app.register(getUsuarioRoutes);
app.register(loginUsuarioRoutes);
app.register(logoutUsuarioRoutes)

app.register(createRemedioRoutes);
app.register(deleteRemedioRoutes);
app.register(updateRemedioRoutes);
app.register(getRemedioRoutes);

app.register(createPrescricaoRoutes);
app.register(deletePrescricaoRoutes);
app.register(updatePrescricaoRoutes);
app.register(getPrescricaoRoutes);

app.register(createHistoricoRoutes);
app.register(getHistoricoRoutes);

app.register(createResponsavelRoutes);
app.register(deleteResponsavelRoutes);




app.listen({
    port: 3333
}).then(() => {
    console.log("Server HTTP running!");
})