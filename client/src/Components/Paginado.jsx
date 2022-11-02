import React from "react";
import modulePaginado from "../Css/Paginado.module.css"

export default function Paginado({dogsForPage, dogs, pag, currentPage}){
    const pageNumbers=[]
    for(let i=1; i<=Math.ceil(dogs/dogsForPage); i++){
        pageNumbers.push(i)
    }
    const prevHandler=()=>{
        if(currentPage <= 1) return
        pag(currentPage -1)
    }
    const nextHandler=()=>{
        if(currentPage >= pageNumbers.length) return
        pag(currentPage + 1)
    }
    return(
        <div className={modulePaginado.container}>
        <button className={modulePaginado.prev} onClick={prevHandler}>prev</button>
                {pageNumbers?.map((number)=>(
                    <button key={number} className={modulePaginado.number} onClick={()=> pag(number)}>{number}</button>
                )
                )}
        <button className={modulePaginado.next} onClick={nextHandler}>next</button>
        </div>
    )
}