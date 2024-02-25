import React from 'react';
import Card from '../Card/Card.js';
import './Cards.css'

//import { useSelector } from 'react-redux';


const Cards = ({ startIndex, endIndex, busqueda})=>{
   
    //const busqueda = useSelector((state) => state.allVideoGamer);

   



    return (
        <div className='contenedor'>
     

           {
                    
                    
                    
                    busqueda.slice(startIndex, endIndex).map((element, index)=> ( 
                    
                    <Card key={index} data={element} 
                    
                    />))
       
                
            }

        </div>
    )
}

export default Cards;