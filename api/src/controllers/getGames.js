//const axios = require('axios');
//const { response } = require('express');
const { Videogame, Genres} = require('../db.js')
const axios = require('axios')
const {
   URL,APPI_KEY
  } = process.env;

const allVideoGamers = async (req, res)=>{
    console.log("Api del servicio"+URL);
    try {
        
        const reponse1 = await axios.get(`${URL}?key=${APPI_KEY}&limit=500&page=1`)
         const reponse2 = await axios.get(`${URL}?key=${APPI_KEY}&limit=500&page=2`)
        const reponse3 = await axios.get(`${URL}?key=${APPI_KEY}&limit=500&page=3`)
        const reponse4 = await axios.get(`${URL}?key=${APPI_KEY}&limit=500&page=4`)
     const reponse5 = await axios.get(`${URL}?key=${APPI_KEY}&limit=500&page=5`)
        const reponse6 = await axios.get(`${URL}?key=${APPI_KEY}&limit=500&page=6`)
          const reponse7 = await axios.get(`${URL}?key=${APPI_KEY}&limit=500&page=7`)
        const reponse8 = await axios.get(`${URL}?key=${APPI_KEY}&limit=500&page=8`)
        const reponse9 = await axios.get(`${URL}?key=${APPI_KEY}&limit=500&page=9`)
        const reponse0 = await axios.get(`${URL}?key=${APPI_KEY}&limit=500&page=10`)
    
          const allgamersonline = { 
            pagina_1:reponse1.data,
            pagina_2:reponse2.data,
            pagina_3:reponse3.data,
           pagina_4:reponse4.data,
            pagina_5:reponse5.data,
            pagina_6:reponse6.data,
           pagina_7:reponse7.data,
            pagina_8:reponse8.data,
            pagina_9:reponse9.data,
            pagina_0:reponse0.data,
              
        }

     //  const allgamersonline =reponse1.data

        console.log("busqueda general desde la api");
        
        const allgamers = await Videogame.findAll();

        if(!allgamers.length){
       //    res.status(400).json()
       return res.status(200).json({allgamersonline})
        //   throw({message: "No hay guardado en la base de datos"})
          
           
        }
            
        return res.status(200).json({allgamersonline,allgamers})

    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const Video_Gamer = async (req, res) =>{
    try {
        const id = req.params.idVideogame
        console.log("Este es el ID"+id)
        console.log(URL+`/${id}?key=${APPI_KEY}` )
        const reponse = await axios.get(`${URL}/${id}?key=${APPI_KEY}`)

        console.log("respuesta"+reponse.date);
        const data_Card =  reponse.data     
        
        if(!data_Card){
            return res.status(400).json({message: "No existe Juego"})
        }

        return res.status(200).json({data_Card})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}




const searchByName = async (req, res) => {
    try {
        const name = req.query.name // Obtener la palabra de búsqueda de la query
        //const regex = new RegExp(name, 'i') // Crear una expresión regular para buscar independientemente de mayúsculas o minúsculas
       // console.log("Esto que me muestra"+regex)
        // Buscar en la API
        const responseAPI = await axios.get(`${URL}/search?search=${name}&page_size=15&key=${APPI_KEY}`);
        //const gamesAPI = responseAPI.data

        // Buscar en la base de datos
        const gamesDB = await Videogame.findAll({
            where: {
                name: {
                    [Sequelize.Op.iLike]: `%${name}%` // Utilizar iLike para la búsqueda insensible a mayúsculas/minúsculas en PostgreSQL
                }
            },
            limit: 15
        })

        if (!gamesAPI.length && !gamesDB.length) {
            return res.status(404).json({ message: "No se encontraron videojuegos con ese nombre" })
        }

        return res.status(200).json({ gamesAPI, gamesDB })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}


const sav_videogamer = async (req,res)=>{
   try {
    const { name, description, platforms, image, release_date, rating, genres  } = req.body
    if(!name || !description || !platforms || !image || !release_date || !rating || !genres ){
        return res.status(404).json({message: "Faltan datos "})
    }

    const create = await Videogame.create({
            name, 
            description, 
            platforms, 
            image, 
            release_date, 
            rating       
    })
    const [genre, created] = await Genres.findOrCreate({
        where: { name: genres },
        defaults: { name: genres }
    });
    if(!created){
        return res.status(400).json({message: "No se pudo crear el genero"})
    }
   

    return res.status(201).json({ message: "Videojuego creado exitosamente" });


} catch (error) {
    return res.status(500).json({ message: error.message }) 
}

}




const getGenres = async (req, res) => {
    try {
        let genres = [];

      
           
            const reponse = await axios.get(`${URL}?key=${APPI_KEY}`)
         
             const allgamersonline = reponse.data
             
         
            if (allgamersonline.results && allgamersonline.results.length > 0) {
                genres = await allgamersonline.results.flatMap(game => game.genres.map(genre => genre.name));
                        console.log("esto es lo encontrado: "+genres);


                for (const genre of genres) {
                    const [genresAll] = await Genres.findOrCreate({
                        where: { name: genre },
                        defaults: { name: genre }
                    });

                }
            } 

            
            genres = await Genres.findAll()
        

        return res.status(200).json({ genres });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


module.exports = {
    allVideoGamers,
    Video_Gamer,
    searchByName,
    sav_videogamer,
    getGenres
}