const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {allVideoGamers, Video_Gamer, searchByName, getGenres } = require('../controllers/getGames')
const {sav_videogamer} = require('../controllers/postFav')
const router = Router();



// Configurar los routers

// Ejemplo: router.use('/auth', authRouter);


router.get('/videogames', allVideoGamers)
router.get('/videogames/:idVideogame', Video_Gamer)
router.get('/videogames/name?="..."', searchByName)
router.post('/videogames', sav_videogamer)
router.get('/genres', getGenres)




module.exports = router;
