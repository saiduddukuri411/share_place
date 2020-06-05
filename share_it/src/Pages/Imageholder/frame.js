import React from 'react';
import './styles/frame.scss'

const Imageframe = () => {
    return (
        <section className="fileContainer">
            <input type="file" accept=".jpg,.png.jpeg" />
            <div>
            </div>
        </section>
    )
}

export default Imageframe;
