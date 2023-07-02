const express = require('express');
const app = express();
const cors = require('cors')

app.use(express.json());
app.use(cors());


const router = require("./routes")
app.use(router);

require("./database/connection")
require("./usuarios/models/usuario")


app.listen(4300, () =>{
    console.log("servidor rodando")
})
