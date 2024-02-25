import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';


import './Detail.css';


const Detail = ()=>{
   const [juego, setJuego]=useState({})
   const { id } = useParams()
 // alert("Entro al detail")


useEffect(()=>{
    const fetchData = async () => {
    try {
        const endpoint = `http://localhost:3001/videogames/${id}`
        const {data} = await axios.get(endpoint)
        const {data_Card} = data
        setJuego(data_Card)
    } catch (error) {
        console.error('Error al mostrar Juegos:', error);
    }
}
fetchData();

},[id]);
console.log("Este es e detalis" + juego.name)


    return (
        <div className="containerDetail">
            <div className='derecha'>
            <img src={juego.background_image} alt={juego.name}/>
            </div>
            <div className='izquierda'>
                <div>
                    <h1>{juego.name}</h1>
                    <Link to={'/home'}><div>X</div>  </Link>               
                </div>
                
                 
           <p> Fecha de Publicación: {juego.released} </p>
           <p>Codigo Registro: {juego.id}</p>
           <p>Rating: {juego.rating}</p>
           <p>Top: {juego.rating_top} </p>
           <p>Genres: {juego.genres?.map( elemen =>(  elemen.name +" - "))}</p>
           <p>Plataformas: { juego.platforms?.map( element =>( element.platform.name+" - "))}</p>
           <p>Description: {juego.description?.replace(/<\/?(p|br)(\s*\/)?>/g, '')}  </p>
           
         
          
         

           </div>         
        </div>
    );
}

export default Detail;