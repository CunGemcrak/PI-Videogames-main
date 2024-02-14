//const axios = require('axios');
//const { response } = require('express');
const { Videogame, Genres} = require('../db.js')
const axios = require('axios')

const allVideoGamers = async ()=>{
    console.log("Api del servicio"+API_KEY);
    try {
        const reponse = await axios.get(URL+`?key=${API_KEY}`)
       /* .then(response =>{
            console.log(response.data);
        })
        .catch(error =>{
            console.log('Error'+ error);
        })*/
        const allgamersonline = reponse.results
        console.log("busqueda general desde la api"+ allgamersonline);
        const [allgamers] = await Videogame.findAll();

        if(!allgamers){
            return res.status(400).json({message: "No hay guardado en la base de datos"})
        }
            
        return res.status(200).json({allgamersonline, allgamers})

    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const Video_Gamer = async (req, res) =>{
    try {
        const id = req.params
        const reponse = axios.get(`URL/${id}&key=${API_KEY}`)

        const data_Card =  reponse.data.results     
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
        const regex = new RegExp(name, 'i') // Crear una expresión regular para buscar independientemente de mayúsculas o minúsculas
        console.log("Esto que me muestra"+regex)
        // Buscar en la API
        const responseAPI = await axios.get(`URL/?search=${name}&key=${API_KEY}`)
        const gamesAPI = responseAPI.data.results

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

        // Verificar si la base de datos está vacía
        const genresDB = await Genres.findAll();
        if (genresDB.length === 0) {
            // Si la base de datos está vacía, obtener los géneros de la API
            const response = await axios.get(`URL+?key=${API_KEY}`)//'https://api.rawg.io/api/genres');

            // Extraer los géneros de la respuesta de la API
           genres = response.data.results.map(result => result.name);

        
        for (const name of genres) {
            await Genres.create({ name });
        }
       
    } else {
        genres = genresDB.map(genre => genre.name);
    }
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