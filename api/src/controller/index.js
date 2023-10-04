const { default: axios } = require("axios");
const { Dog, Temperament } = require("../db");
//codigo viego

// const infoApi = async () => {
//   const apiDogsTotal = await axios.get("https://api.thedogapi.com/v1/breeds");
//   const dogsInfo = apiDogsTotal.data.map((e) => {
//     const peso = e.weight.metric.split("-");
//     const altura = e.height.metric.split("-");
//     const pesoMin = parseInt(peso[0]);
//     const pesoMax = parseInt(peso[1]);
//     const alturaMin = parseInt(altura[0]);
//     const alturaMax = parseInt(altura[1]);
//     return {
//       id: e.id,
//       name: e.name,
//       height_max: alturaMax ? alturaMax : 1,
//       height_min: alturaMin ? alturaMin :  1,
//       weight_max: pesoMax ? pesoMax : 1,
//       weight_min: pesoMin ? pesoMin : 1,
//       life_span: e.life_span,
//       // image: e.image.url,
//       temperaments: e.temperament ? e.temperament : "No tiene Temperamento",
//     };
//   });

//   return dogsInfo;
// };

const infoApi = async () => {
  try {
    const apiDogsTotal = await axios.get("https://api.thedogapi.com/v1/breeds");
    const dogsInfo = await Promise.all(
      apiDogsTotal.data.map(async (e) => {
        const peso = e.weight.metric.split("-");
        const altura = e.height.metric.split("-");
        const pesoMin = parseInt(peso[0]);
        const pesoMax = parseInt(peso[1]);
        const alturaMin = parseInt(altura[0]);
        const alturaMax = parseInt(altura[1]);

        try {
          const imageResponse = await axios.get(
            `https://api.thedogapi.com/v1/images/${e.reference_image_id}`
          );

          if (imageResponse.status === 429) {
            // Esperar y reintentar después de un tiempo
            console.log("Se alcanzó el límite de solicitudes. Esperando...");
            await new Promise((resolve) => setTimeout(resolve, 60000)); // Espera 60 segundos
            return null; // Otra opción es retornar null u otro valor para marcar que la solicitud no se completó
          }

          const imageUrl =
            imageResponse.status === 200 ? imageResponse.data.url : null;

          return {
            id: e.id,
            name: e.name,
            height_max: alturaMax ? alturaMax : 1,
            height_min: alturaMin ? alturaMin : 1,
            weight_max: pesoMax ? pesoMax : 1,
            weight_min: pesoMin ? pesoMin : 1,
            life_span: e.life_span,
            image: imageUrl,
            temperaments: e.temperament
              ? e.temperament
              : "No tiene Temperamento",
          };
        } catch (imageError) {
          console.error("Error al obtener la imagen:", imageError);
          return null; // Otra opción es retornar null u otro valor para marcar que la solicitud de imagen no se completó
        }
      })
    );

    const filteredDogsInfo = dogsInfo.filter((info) => info !== null);

    return filteredDogsInfo;
  } catch (error) {
    console.error("Error al realizar la solicitud a la API:", error);
  }
};

// Resto del código igual

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
  let dato = JSON.parse(JSON.stringify(dB, null, 2));
  dato.forEach(
    (el) => (el.temperaments = el.temperaments.map((el) => el.name))
  );
  return dato;
};

const infoTotal = async () => {
  const infoApiDogs = await infoApi();
  const infoDataBase = await infoDb();
  const total = infoDataBase.concat(infoApiDogs);
  return total;
};

module.exports = {
  infoTotal,
  infoApi,
};
