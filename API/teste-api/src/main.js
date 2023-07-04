const express = require('express');
const app = express();
const cors = require('cors')

app.use(express.json());
app.use(cors());


const router = require("./routes")
app.use(router);

require("./database/connection")
require("./usuarios/models/usuario")
require("./usuarios/models/cardPermissions")
require("./usuarios/models/groups")
require("./usuarios/models/propertyPermissions")

app.listen(4300, () =>{
    console.log("servidor rodando")
})
