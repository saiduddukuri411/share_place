import React from 'react';
import '../styles/card.scss';
import {NavLink} from 'react-router-dom';
import {BdFilter} from '../../../Usercontext'

const Card = ({text,link}) => {
    const {setli,setsd,setbd,Link}=React.useContext(BdFilter)
    const handler=()=>{
     setsd((prev)=>false)
     setbd((prev)=>false)
     if(text==='LOG OUT'){
        setli((prev)=>false)
     }
    }
    return (
        
        <NavLink className="card" exact={true} to={link} activeClassName="active-card" onClick={handler}>
            <h5>{text}</h5>
        </NavLink>
    )
}
export default Card;
