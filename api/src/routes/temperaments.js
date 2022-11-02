const { Router } = require("express");
const { infoTotal, infoApi } = require("../controller");
const { Dog, Temperament } = require("../db");
// const {infoTotal} = require("../controller/index")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

router.get("/", async (req, res) => {
  const dogsAll = await infoApi();
  // console.log({dogsAll})
  const everyTemperament = dogsAll.map((dog) => (dog.temperaments ? dog.temperaments : "No tiene Temperamento"))
    const temperamentEvery= everyTemperament.map((dog) => dog?.split(", "));
  const finalTemperament = [...new Set(temperamentEvery.flat())];
  // console.log({finalTemperament})
  finalTemperament.forEach((e) => {
    Temperament.findOrCreate({
      where: { name: e },
    });
  });
  const temperament = await Temperament.findAll();
  res.status(200).json(temperament);
});

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
