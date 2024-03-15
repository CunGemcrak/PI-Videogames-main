import  './Card.css';
import  img_mario from '../../img/videogame.png'
import { Link } from "react-router-dom";




const Card = ({data})=>{
    const { id, name,  genres, background_image } = data;
    const urls = (imagen) => {
        const imageExtensions = /\.(jpg|jpeg|png|gif|bmp)$/i;
    
        return imageExtensions.test(imagen);
    };

    //console.log("Elementos de la card "+  name  +  ' '+  genres +  ' '+ background_image );
    return (
        <div className='principal' id={id} >
             <Link to={`/detail/${id}`} >
            <div className="containerCard">
                <img src={
                    urls(background_image) 
                    ?background_image
                    :img_mario 
                    } alt={name} className='imagengame'/>
             <div className='submenuCard'>
                <div className='textocards'>{name}</div>
                <div className='textocards2'>{genres} </div>
               
             </div>
            </div>
            </Link>
        </div>
        
    )
}

export default Card;