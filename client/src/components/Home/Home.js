import React, {useState} from "react"
import Cards from "../Cards/Cards.js";
import './Home.css';
import saltomario from '../../img/saltomario.png'
import saltoluigui from '../../img/saltoluigui.png'
import estrella from '../../img/estrella.png'
import derecha from '../../img/derecha.png'
import izquieda from '../../img/izquierda.png'

import { useSelector } from 'react-redux';





const Home = ()=>{
    const busqueda = useSelector((state) => state.allVideoGamer);

    const [startIndex, setStartIndex] = useState(0)
    const [endIndex, setEndIndex] = useState(15)
    const [page, setPage ] = useState(1)
    



const handleNex = ()=>{
    //alert("Siguiente busqueda");
    if(endIndex < busqueda.length ){
        setStartIndex(startIndex + 15);
            setEndIndex(endIndex + 15);
            setPage(page+1)
    }else{ 
        setStartIndex(0);
            setEndIndex(15);
            setPage(1)
    }

   
}

const handleback = ()=>{
   // alert("Anterior ");
   const newStartIndex = Math.max(startIndex - 15, 0);
   setStartIndex(newStartIndex);
   setEndIndex(newStartIndex + 15);
   setPage(-1)
    
}
    
 
    return (
    
            <div className="bodyHome">
                <div className="containerHome">
                <div>
                    <img src={saltomario} alt="salto mario" className="manejoimagenmario"/>
                </div>
                 <div className="containerHomeCard">
                 <Cards className="containerHomeCard" startIndex={startIndex} endIndex={endIndex} busqueda={busqueda}/>
                    
                    </div>
                    <div>
                    <img src={saltoluigui} alt="salto mario" className="manejoimagenluigui"/>
                </div>   
                </div>  
                <div className="paginas">
                    <div>
                        <img src={izquieda} alt="Anterior" className="anterior" onClick={handleback}/>
                        <img src={estrella} alt="mario" className="estrella"/><label className="pagelabel">{page}</label>
                        <img src={estrella} alt="mario" className="estrella"/>
                        <img src={derecha} alt="siguiente" className="siguiente" onClick={handleNex} />
                    </div>


                </div>
            </div>)
}





export default Home