import './Card.css'
import React from 'react'

function Card(props){
    return(
        <div className="Card" style={{borderColor: props.color || '#000'}}>
            <div className="Label" style={{backgroundColor: props.color || '#000'}}>
                {props.titulo}
            </div>
            <div className="Conteudo" >
                {props.children}
            </div>
            
        </div>
    )
}
 
export default Card