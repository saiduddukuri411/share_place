import React from 'react';
import '../styles/link.scss';
import Card from './card'
const link = ({text,link}) => {
    return (
        <div className="link">
            <Card text={text} link={link}/>
            
        </div>
    )
}
export default link;

