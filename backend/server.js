import express from "express"; 
import router from "./src/routes/main.routes.js"; 
import { logEvents, logger } from "./src/middlewares/logger.middlewares.js";

const app = express(); 
const PORT = process.env.BACKEND_PORT || 3000; 

app.use(logger);
app.use(express.json());

app.use("/", router);

app.listen(PORT,  () => {
   console.log(`✅ Servidor rodando na porta ${PORT}`);
   logEvents(`✅ Servidor rodando na porta ${PORT}`, "server.log")
}); 