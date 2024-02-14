//const axios = require('axios');
//const { response } = require('express');
const { Videogame, Genres} = require('../db.js')
//const axios = require('axios')

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





module.exports = {sav_videogamer}