import React, { useEffect, useState } from 'react';
import Card from '../Card/Card.js';
import './Cards.css'

import Nohaydatos from '../../img/no.png'

//import { useSelector } from 'react-redux';


const Cards = ({ startIndex, endIndex, busqueda})=>{
   
    //const busqueda = useSelector((state) => state.allVideoGamer);
    const [existe, setExiste] = useState(false)

   useEffect(()=>{
  



    if(busqueda.length === 0){
        setExiste(false); // Si no hay datos, cambiar el estado a `false`
    } else {
        setExiste(true); 
    }

   }, [busqueda])



    return (
        <div className='contenedor'>
     

           {
                    
                    existe === true                     
                    ? busqueda.slice(startIndex, endIndex).map((element, index)=> (<Card key={index} data={element}/>))
                    : <div className='verificar'>   <h1 className='sinJuego'> </h1>  <img className='imgSinjuego' src={Nohaydatos} alt='No se encontraron datos'/> </div> 
       
                
            }

        </div>
    )
}

export default Cards;