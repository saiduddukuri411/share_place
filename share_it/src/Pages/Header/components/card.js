import React from 'react';
import '../styles/card.scss';
import {NavLink} from 'react-router-dom';

const card = ({text,link}) => {
    return (
        <NavLink className="card" exact={true} to={link} activeClassName="active-card">
            <h5>{text}</h5>
        </NavLink>
    )
}
export default card;
