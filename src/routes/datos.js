const {Router} = require("express");
const datosController = require("../controllers/datos.js");
const router = Router();

router.get("/datos/:idOrEmail", datosController.getDatosAlumnoByIdOrEmail);

router.get("/datos/prece/:idDepto", datosController.getIdPreceptor);

router.get("/datos/getjefe/:IdEmpleado", datosController.getJefeDepartamento);

router.get("/datos/vigilancia/:IdEmpleado", datosController.getJefeVigilancia);

module.exports = router;