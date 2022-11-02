import React from "react";
import { Link } from "react-router-dom";
import moduleLanding from "../Css/Landing.module.css"

export default function LandinPage(){
    return(
    <div className={moduleLanding.conteiner}>
        <div className={moduleLanding.description}>
            <div className={moduleLanding.text}>
                <h1>Bienvenidos!!!</h1>
                <br></br>
                <h2>Esta es mi app de Perro</h2>
            </div>
            <div >
        <Link to={"/home"}><button className={moduleLanding.button}>Ingrese a la Pagina</button></Link>
            </div>
        </div>
        
    </div>
    )
}