import React from "react";
import { Link } from "react-router-dom";
import moduleLanding from "../Css/Landing.module.css"

export default function LandinPage(){
    return(
    <div className={moduleLanding.conteiner}>
        <div className={moduleLanding.description}>
            <div className={moduleLanding.text}>
                <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum illum, illo doloribus nesciunt, fuga eligendi sunt consectetur impedit dolor error nemo totam quis modi ad tenetur, magni deleniti incidunt laborum.</h1>
            </div>
            <div >
        <Link to={"/home"}><button className={moduleLanding.button}>Ingrese a la Pagina</button></Link>
            </div>
        </div>
        
    </div>
    )
}