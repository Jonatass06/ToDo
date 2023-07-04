const express = require("express");
const CardPermissions = require("../models/cardPermissions");
const routes = express.Router();

function createRoute(){
    routes.post('/cardPermissions', async (req, res)=>{
        await CardPermissions.create(req.body)
        res.json(req.body, null, 2);
    });
}
function findAllRoute(){
    routes.get('/cardPermissions', async (req, res)=>{
        res.json(await CardPermissions.findAll(), null, 2)
    });
}
function findByUserIdRoute(){
    routes.get('/cardPermissions/:id', async(req, res)=>{
        const cardPermissions = await CardPermissions.findAll(req.params, {
            where:{
                userId:req.params.id
            }
        });
        res.json(cardPermissions, null, 2);
    });
}
function removeRoute(){
    routes.delete('/cardPermissions/:id', async (req, res)=>{
        console.log(req.params)
        await CardPermissions.destroy({
            where: {
              id: req.params.id
            }
          });
        res.json(req.params, null, 2);
    });
}

function registraCardPermissionsRotas(){
    createRoute();
    findAllRoute();
    removeRoute();
    findByUserIdRoute();
    return routes;
}

module.exports = registraCardPermissionsRotas

