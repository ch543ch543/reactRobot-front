import React from 'react';
import brain from './brain.png';
import Tilt from 'react-tilt';
import './Logo.css'


const Logo = () => {
    return(
        <div className='ma4 mt0'>
            <Tilt className="Tilt" options={{ max : 100 }} style={{ height: 100, width: 100 }} >
                <div className="Tilt-inner"> <img style={{paddingTop: '3px'}} alt='logo' src= {brain} /> 
                </div>
            </Tilt>
        </div>
    )
}

export default Logo;