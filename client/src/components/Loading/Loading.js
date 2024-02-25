import React from "react"
import  './Loading.css'
import {Link} from 'react-router-dom'


const Loading = ()=>{
    return <div className="Loadingbody">
        <h1>Henry Videogames</h1>
                            <h1>Loading... </h1>
                            <Link to='/home'> <button className="LoadinBoton" > Iniciar </button></Link>
                            <div  className="fondoinicial"></div>
                </div>
}

export default Loading;