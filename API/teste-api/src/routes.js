const express = require("express");
const router = express.Router();

const registraUsuarioRotas = require('./usuarios/controllers/usuarios-controller.js');
router.use(registraUsuarioRotas());

module.exports = router;