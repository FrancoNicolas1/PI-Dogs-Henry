const { default: axios } = require("axios");
const { Dog, Temperament } = require("../db");

const infoApi = async () => {
  const apiDogsTotal = await axios.get("https://api.thedogapi.com/v1/breeds");
  const dogsInfo = apiDogsTotal.data.map((e) => {
    const peso = e.weight.metric.split("-")
    const altura = e.height.metric.split("-")
    const pesoMin = parseInt(peso[0]);
    const pesoMax = parseInt(peso[1]);
    const alturaMin = parseInt(altura[0]);
    const alturaMax = parseInt(altura[1]);
    return {
      id: e.id,
      name: e.name,
      height_max: alturaMax ? alturaMax : 1,  
      height_min: alturaMin ? alturaMin : 1,
      weight_max: pesoMax ? pesoMax : 1,
      weight_min: pesoMin ? pesoMin : 1,
      life_span: e.life_span,
      image: e.image.url,
      temperament: e.temperament,
    };
  });
  return dogsInfo;
};

const infoDb = async () => {
  const dB = await Dog.findAll({
    include: {
      model: Temperament,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  return dB;
};

const infoTotal = async () => {
  const infoApiDogs = await infoApi();
  const infoDataBase = await infoDb();
  const total = infoDataBase.concat(infoApiDogs);
  return total;
};

module.exports = {
  infoTotal,
};
