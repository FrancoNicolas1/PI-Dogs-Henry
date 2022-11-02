const { Router } = require('express');
const dogsAll = require("./dogs")
const temperamentsAll = require("./temperaments")

// const bredForAll = require("./prueba2")
const {infoTotal} = require("../controller/index")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
router.use("/dogs", dogsAll)
router.use("/temperaments", temperamentsAll)

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);




module.exports = router;
