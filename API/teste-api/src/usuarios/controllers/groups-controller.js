const express = require("express");
const Groups = require("../models/groups");
const routes = express.Router();

function createRoute(){
    routes.post('/groups', async (req, res)=>{
        await Groups.create(req.body)
        res.json(req.body, null, 2);
    });
}
function findAllRoute(){
    routes.get('/groups', async (req, res)=>{
        res.json(await Groups.findAll(), null, 2)
    });
}
function findByIdRoute(){
    routes.get('/groups/:id', async(req, res)=>{
        const groups = await Groups.findAll(req.params, {
            where:{
                id:req.params.id
            }
        });
        res.json(groups, null, 2);
    });
}
function removeRoute(){
    routes.delete('/groups/:id', async (req, res)=>{
        console.log(req.params)
        await Groups.destroy({
            where: {
              id: req.params.id
            }
          });
        res.json(req.params, null, 2);
    });
}

function updateRoute(){
    routes.put('/usuarios/', async (req, res)=>{
        await Usuario.update( req.body , {
            where: {
              id: req.body.id
            }
          })
        res.json(req.body, null, 2);
    });
}

function registraGroupsRotas(){
    createRoute();
    findAllRoute();
    removeRoute();
    findByIdRoute();
    updateRoute();
    return routes;
}

module.exports = registraGroupsRotas

