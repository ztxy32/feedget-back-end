import express from "express"
import cors from "cors"

import { routes } from "./routes"

const App = express();

//GET = Buscar informações do back-end
//ṔOST = Cadastrar informações 
//PUT = Atualizar informações duma entidade
//DELET = Excluir uma informação

App.use(cors())
App.use(express.json())
App.use(routes)
App.listen(process.env.PORT || 3333, () => {
    console.log("server running...")
})

