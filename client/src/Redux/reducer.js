import {BUSQUEDA, BUSCARALL, FILTER, GENRES, COPY, INDIVIDUALBUSQUEDA, INDIVIDUALAPI} from './action-types';

const initialState = {
   
    allVideoGamer: [],
    videoGamer:[],
    genres:[]
}

const reducer = (state= initialState, {type, payload})=>{
    console.log("entro al reducer la informacion" + payload);
    
    
    switch( type ){
        case BUSQUEDA:
            return {...state, allVideoGamer: payload}
        case BUSCARALL:
            return {...state, allVideoGamer: payload, videoGamer:payload}
        case FILTER:
          //  const valor = payload.toLowerCase();
                
               // const allCharactersFiltered =state.videoGamer.filter(element=> element.genres.includes(payload))
             //  const allCharactersFiltered =state.videoGamer.filter(element=> element.genres.toUpperCase().includes(payload))
              
              const allCharactersFiltered = state.videoGamer.filter(element => element.genres.includes(payload));
                return{
                    ...state,
                    allVideoGamer:allCharactersFiltered,
                   
                }  
            case COPY:
                return{...state, allVideoGamer: state.videoGamer}

            
            case GENRES:
                return{
                    ...state, genres:payload
                } 

            case INDIVIDUALBUSQUEDA:
                const busquedaporname =state.videoGamer.filter(element=> element.name.includes(payload))
                return {
                    ...state,
                    allVideoGamer:busquedaporname,
                }  
            case INDIVIDUALAPI:
                return{
                    ...state,
                    allVideoGamer: payload
                }
        default:
            return {...state}
    }




}

export default reducer;