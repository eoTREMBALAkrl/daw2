import fastify from "fastify";
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from "fastify-type-provider-zod";

import { createUsuarioRoutes } from "./routes/usuario/create-usuario";
import { deleteUsuarioRoutes } from "./routes/usuario/delete-usuario";
import { updateUsuarioRoutes } from "./routes/usuario/update-usuario";
import { getUsuarioRoutes } from "./routes/usuario/get-usuario";

import {createRemedioRoutes} from "./routes/remedio/create-remedio";
import {deleteRemedioRoutes} from "./routes/remedio/delete-remedio";
import {updateRemedioRoutes} from "./routes/remedio/update-remedio";
import {getRemedioRoutes} from "./routes/remedio/get-remedio";

import {createPrescricaoRoutes} from "./routes/prescricao/create-prescricao";
import {deletePrescricaoRoutes} from "./routes/prescricao/delete-prescricao";
import {updatePrescricaoRoutes} from "./routes/prescricao/update-prescricao";
import {getPrescricaoRoutes} from "./routes/prescricao/get-prescricao";

import {createHistoricoRoutes} from "./routes/historico/create-historico";
import {deleteHistoricoRoutes} from "./routes/historico/delete-historico";
import {updateHistoricoRoutes} from "./routes/historico/update-historico";
import {getHistoricoRoutes} from "./routes/historico/get-historico";

const app = fastify().withTypeProvider<ZodTypeProvider>();
app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)


app.register(createUsuarioRoutes);
app.register(deleteUsuarioRoutes);
app.register(updateUsuarioRoutes);
app.register(getUsuarioRoutes);

app.register(createRemedioRoutes);
app.register(deleteRemedioRoutes);
app.register(updateRemedioRoutes);
app.register(getRemedioRoutes);

app.register(createPrescricaoRoutes);
app.register(deletePrescricaoRoutes);
app.register(updatePrescricaoRoutes);
app.register(getPrescricaoRoutes);

app.register(createHistoricoRoutes);
app.register(deleteHistoricoRoutes);
app.register(updateHistoricoRoutes);
app.register(getHistoricoRoutes);



app.listen({
    port: 3333
}).then(() => {
    console.log("Server HTTP running!");
})