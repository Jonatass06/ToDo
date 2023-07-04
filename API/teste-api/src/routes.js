const express = require("express");
const router = express.Router();

const registraUsuarioRotas = require('./usuarios/controllers/usuarios-controller.js');
router.use(registraUsuarioRotas());
const registraCardPermissionsRotas = require('./usuarios/controllers/cardPermissions-controller.js');
router.use(registraCardPermissionsRotas());
const registraPropertyPermissionsRotas = require('./usuarios/controllers/propertyPermissions-controller.js');
router.use(registraPropertyPermissionsRotas());
const registraGroupsRotas = require('./usuarios/controllers/groups-controller.js');
router.use(registraGroupsRotas());

module.exports = router;