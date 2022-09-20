import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getDogName } from "../Redux/action";
import moduleNavbar from "../Css/Navbar.module.css"

export default function Navbar(){
    const dispatch=useDispatch()

    const [name, setName]=useState("")

    const handleChange=(e)=>{
        e.preventDefault()
        setName(e.target.value)

    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        dispatch(getDogName(name))
    }

    return(
        <div className={moduleNavbar.container}>
            <input className={moduleNavbar.search}
            type={"text"}
            placeholder="Ingrese nombre"
            onChange={handleChange}
            />
            <button className={moduleNavbar.button} onClick={handleSubmit}>Buscar Raza</button>  
        </div>
    )
} 