const { Router } = require("express");
const { infoTotal } = require("../controller");
const {Dog}= require("../db")
// const {infoTotal} = require("../controller/index")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

router.get("/", async (req, res) => {
    const allGroup= await infoTotal()
    const filter = allGroup.map((e)=>e.breed_group)
    const final = [...new Set(filter)]
  res.json(final)
});


router.delete("/:id", async (req,res) => {
    const {id}= req.params
    if(!id){
        res.send("Debe ingresar in Id para eliminar")
    }else{
        await Dog.destroy({
            where:{
                id
            }
        })
        res.send("Perro eliminado")
    }   
   })
   



// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
