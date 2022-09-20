import React from "react";
import { Link } from "react-router-dom";
import "../Css/css.css"


export default function Card({id, name, img, temperament, weight_max, weight_min}){
    return(
        <div className="conten">
            <h1  className="h1">Raza:
            <br/>
            {name}</h1>
            <Link to={"/dogs/"+ id}>
            <img  className="image" src={img} alt={"no hay"}/>
            </Link>
            <p className="p">TEMPERAMENTO = {temperament}</p>
            <p className="p">PESO MAXIMO = {weight_max}</p>
            <p className="p">PESO MINIMO = {weight_min}</p>
        </div>
    )
}