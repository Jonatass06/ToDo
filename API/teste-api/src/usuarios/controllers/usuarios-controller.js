const express = require("express");
const CardPermissions = require("../models/cardPermissions");
const routes = express.Router();
const Usuario = require("../models/usuario")

function createRoute() {
    routes.post('/usuarios', async (req, res) => {
        await Usuario.create(req.body)
        res.json(req.body, null, 2);
    });
}
function findAllRoute() {
    routes.get('/usuarios', async (req, res) => {
        res.json(await Usuario.findAll(), null, 2)
    });
}
function findByIdRoute() {
    routes.get('/usuarios/:id', async (req, res) => {
        res.json(
            await Usuario.findOne({
                where: {
                    id: req.params.id
                }
            }), null, 2);
    });
}

function updateRoute() {
    routes.put('/usuarios/', async (req, res) => {
        await Usuario.update(req.body, {
            where: {
                id: req.body.id
            }
        })
        res.json(req.body, null, 2);
    });
}

function removeRoute() {
    routes.delete('/usuarios/:id', async (req, res) => {
        console.log(req.params)
        await Usuario.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json(req.params, null, 2);
    });
}

function registraUsuarioRotas() {
    createRoute();
    findAllRoute();
    findByIdRoute();
    updateRoute();
    removeRoute();
    return routes;
}

module.exports = registraUsuarioRotas

