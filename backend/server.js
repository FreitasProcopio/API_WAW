import express from "express"; 
import Dicio from "./src/routes/main.routes.js"; 
import { logEvents, logger } from "./src/middlewares/logger.middlewares.js";

const app = express(); 
const PORT = 3000; 

app.use(logger);
app.use(express.json());

app.use("/", Dicio);

app.listen(PORT,  () => {
   logEvents(`✅ Servidor rodando na porta ${PORT}`, "server.log");
}); 