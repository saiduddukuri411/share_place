import React from 'react';
import '../styles/card.scss';

const card = ({source,name,count}) => {
    return (
        <div className="card-container">
            <div className="top-portion">
                <img src={source} alt="male" />
                <h5>{count>1?`${count} places` :`${count} place` }</h5>
            </div>
            <div className="bottom-portion">
        <h3>{name}</h3>
            </div>
        </div>
    )
}
export default card;
