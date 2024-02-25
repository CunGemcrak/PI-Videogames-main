import {BUSQUEDA, BUSCARALL} from './action-types';

const initialState = {
   
    allVideoGamer: [],
    videoGamer:{},
    test:"test"
}

const reducer = (state= initialState, {type, payload})=>{
    console.log("entro al reducer la informacion" + payload );
    
    
    switch( type ){
        case BUSQUEDA:
            return {...state, allVideoGamer: payload}
        case BUSCARALL:
            return {...state, allVideoGamer: payload}
        default:
            return {...state}
    }




}

export default reducer;