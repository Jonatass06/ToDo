const express = require("express");
const PropertyPermissions = require("../models/propertyPermissions");
const routes = express.Router();

function createRoute(){
    routes.post('/propertyPermissions', async (req, res)=>{
        await PropertyPermissions.create(req.body)
        res.json(req.body, null, 2);
    });
}
function findAllRoute(){
    routes.get('/propertyPermissions', async (req, res)=>{
        res.json(await PropertyPermissions.findAll(), null, 2)
    });
}
function findByUserIdRoute(){
    routes.get('/propertyPermissions/:id', async(req, res)=>{
        const propertyPermissions = await PropertyPermissions.findAll({
            where:{
                userId:req.params.id
            }
        });
        res.json(propertyPermissions, null, 2);
    });
}
function removeRoute(){
    routes.delete('/propertyPermissions/:id', async (req, res)=>{
        console.log(req.params)
        await PropertyPermissions.destroy({
            where: {
              id: req.params.id
            }
          });
        res.json(req.params, null, 2);
    });
}

function registraPropertyPermissionsRotas(){
    createRoute();
    findAllRoute();
    removeRoute();
    findByUserIdRoute();
    return routes;
}

module.exports = registraPropertyPermissionsRotas

