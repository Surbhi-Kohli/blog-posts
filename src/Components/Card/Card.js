import React from "react";
import { NavLink } from 'react-router-dom'
import classes from "./Card.module.css";
function Card(props){
    return ( 
    <div >
       <h1>{props.data.title}</h1>
       <p>{props.data.body}</p>
      
    </div>
    )
}
export default Card;