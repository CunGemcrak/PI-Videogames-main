import {BUSQUEDA, BUSCARALL, FILTER, GENRES, COPY, INDIVIDUALBUSQUEDA, INDIVIDUALAPI} from './action-types.js'
import axios from 'axios';

export const Listado = ()=>{
    return async (dispatch)=>{
        try {
            console.log("entro en la busqueda");
            const endpoint = 'http://localhost:3001/videogames/'
            const {data} = await axios.get(endpoint)
            console.log("desarrollo el data");
            const {results} = data.allgamersonline
            
            
            const newData =  results.map(element => {
                console.log("datos "+element.id +' - '+element.name);                  
                  return {
                                      id: element.id,
                                      name: element.name,
                                      background_image: element.background_image,
                                      rating: element.rating,
                                      genres: element.genres.name,                           
                                    }
                                  });
          

            dispatch({ 
                    type: BUSQUEDA,
                    payload: newData,   
                })
        } catch (error) {
            console.error('Error al mostrar Juegos:', error);
        }
       




    }
}


export const busquedaAll =() =>{

    return async (dispatch)=>{
        try {
            console.log("entro en la busqueda");
            const endpoint = 'http://localhost:3001/videogames/'
            const {data} = await axios.get(endpoint)
           
            //const pagina= data.allgamersonline
           // const allgamersonline = data.allgamersonline; 
            const priemrabusqueda = []
            
            for(const pagina in data.allgamersonline){
                if (Object.hasOwnProperty.call( data.allgamersonline, pagina)){
                    const results = data.allgamersonline[pagina].results;
                    const formattedResults = results.map(element => ({
                        id: element.id,
                        name: element.name.toUpperCase(),
                        background_image: element.background_image,
                        rating: element.rating,
                        genres: element.genres[0].name 
                    }));
                    priemrabusqueda.push(...formattedResults);

                }

            }




        /*    pagina.map((element) => {
                const results = element.results
                console.log("datos "+results.id +' - '+results.name);                  
                  return {
                                      id: results.id,
                                      name: results.name,
                                      background_image: results.background_image,
                                      rating: results.rating,
                                      genres: results.genres[0].name,                           
                                    }

            } )
         */

/*
          const priemrabusqueda =  results.map(element => {
                console.log("datos "+element.id +' - '+element.name);                  
                  return {
                                      id: element.id,
                                      name: element.name,
                                      background_image: element.background_image,
                                      rating: element.rating,
                                      genres: element.genres[0].name,                           
                                    }
                                  });

                               //   console.log("mostrando busqueda"+ JSON.stringify(priemrabusqueda))
                               */
            
            dispatch({ 
                type: BUSCARALL,
                payload: priemrabusqueda,   
            })
        } catch (error) {
            console.error('Error al mostrar Juegos:', error);
        }
    }
}



export const genres = ()=>{
    return async (dispatch)=> {
        try {
           
              
                const endpoint = 'http://localhost:3001/genres/'
                const {data} = await axios.get(endpoint)
                const genres = data.elementos
                dispatch({
                    type: GENRES,
                    payload: genres,
                })
        
        } catch (error) {
            console.error('Error al mostrar el genres:', error);
        }  
    
    }
}



export const busquedaIndividual=(data)=>{
    return{type: INDIVIDUALBUSQUEDA, payload: data.toUpperCase()}
    /*return async (dispatch) => { 
                                try {
                                    const endpoint = 'http://localhost:3001/videogames/:'
                                                const {data} = await axios.get(endpoint+data)
                                                const {data_Card} = data
                                                dispatch({
                                                    type: INDIVIDUALBUSQUEDA,
                                                    payload: genres,
                                                })
                                } catch (error) {
                                    console.error('Error al mostrar la busqueda:', error);
                                }

             }*/
}


export const busquedaIndApi=(data)=>{
    return async (dispatch)=>{
                        try {
                            const endpoint = 'http://localhost:3001/videogames/name/:'
                                                                const resultatadoApi = await axios.get(endpoint+data)
                                                                const {data_Card} = resultatadoApi
                                                                dispatch({
                                                                    type: INDIVIDUALAPI,
                                                                    payload: data_Card,
                                                                })


                        } catch (error) {
                            console.error('Error al mostrar la busqueda:', error);
                        }
    }
}



export const fiterCard = (gender) =>{
    return {type:FILTER , payload: gender }
}

export const CopiaAllVideoGamer = ()=>{
    return {type:COPY, payload:"copia"}
}