const { json } = require("body-parser");
const { Router } = require("express");
const { infoTotal } = require("../controller");
const { Dog, Temperament } = require("../db");
// const {infoTotal} = require("../controller/index")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/", async (req, res, next) => {
  const { name } = req.query;
  const allDogs = await infoTotal();
  if (name) {    
    
    const dogName = allDogs.filter((e) =>e.name.toLowerCase().includes(name.toLowerCase())
    );
    dogName.length
      ? res.status(200).json(dogName)
      : res.status(404).send("No existe");

  }
  
   else {
    res.status(200).json(allDogs);
  }
  
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const allDogs2 = await infoTotal();
  if (id) {
    const dogId = allDogs2.filter((e) => e.id == id);
    dogId.length
      ? res.status(200).json(dogId)
      : res.status(404).send("Ese id no existe");
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      name,
      weight_min,
      weight_max,
      height_min,
      height_max,
      life_span,
      image,
      temperaments,
    } = req.body;
    let newDog = await Dog.create({
      name,
      weight_min,
      weight_max,
      height_min,
      height_max,
      life_span,
      image,
    });

    let temperamentNewDog = await Temperament.findAll({
      where: { name: temperaments },
    });

    newDog.addTemperament(temperamentNewDog);
    res.send("Tu nueva raza perruna ha sido agregada");
  } catch (error) {
    console.log(error);
  }
});



module.exports = router;
