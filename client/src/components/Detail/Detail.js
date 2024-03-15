import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'


import imagennull from '../../img/videogame.png'


import './Detail.css'


const Detail = ()=>{
   const [juego, setJuego]=useState({})
   
   const { id } = useParams()
 // alert("Entro al detail")


useEffect(()=>{
    const fetchData = async () => {
    try {
        const endpoint = `http://localhost:3001/videogames/${id}`
        const response = await axios.get(endpoint)
        const {data_Card} = response.data
       // console.log("Mostremos lo que llega del back"+ JSON.stringify(data_Card))
        setJuego(data_Card)
    } catch (error) {
        console.error('Error al mostrar Juegos:', error)
    }
}
fetchData();

},[id]);
//console.log("Este es e detalis" +imagennull)



const hondleImagen=  (img1, img2)=>{

   
    const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif'];

    const isValid =  (imagen) => {
        if (!imagen) return false;
        const lowerCaseUrl = imagen.toLowerCase();
        return imageExtensions.some(ext => lowerCaseUrl.endsWith(ext))
    }

    const img1Valid =  isValid(img1)
    const img2Valid =  isValid(img2)
    


    if(img1Valid){
        return  img1 
    }else
    if(img2Valid){
        return  img2
    }else
    {
        return  imagennull
    }

    

}
    return (
        <div className="containerDetail">
            <div className='derecha'>
            <img src={hondleImagen(juego.background_image, juego.image)} alt={juego.name} />
            </div>
            <div className='izquierda'>
                <div>
                    <h1>{juego.name}</h1>
                    <Link to={'/home'}><div>X</div>  </Link>               
                </div>
                
                    
           <p> Fecha de Publicación: {juego.released || juego.release_date || imagennull} </p>
           <p>Codigo Registro: {juego.id}</p>
           <p>Rating: {juego.rating }</p>
           <p>Top: {juego.rating_top || null } </p>
           <p>Genres: {juego.genres ? juego.genres.map(elemen => (elemen.name + " - ")) : juego.genre}</p>
           <p>Plataformas: {Array.isArray(juego.platforms) && juego.platforms.length > 0 ? juego.platforms.map(element => (element.platform.name + " - ")) : "No hay información de plataformas"}</p>
           <p>Description: {juego.description?.replace(/<\/?(p|br)(\s*\/)?>/g, '')}  </p>
                    
           
          
         

           </div>         
        </div>
    );
}

export default Detail;