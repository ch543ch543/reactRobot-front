import React from 'react';
import './ImageLinkForm.css';


const ImageLinkForm = ({onInputChange, onButtonSubmit}) => { /*distructor onInputChange from the props*/
    return(
        <div>
            <p className='f3'>
                 {'This Magic Brain will detect faces in your pictures. Give it a try!'}
            </p> 
            <div className='center'>
                <div className='form center pa4 br3 shadow-5' >
                    <input className='f4 pa2 w-70 center' type='tex' onChange = {onInputChange} /> 
                    <button className=' w-40 grow f4 link ph3 pv2 ' style={{backgroundColor: '#e5c9f1'}} onClick = {onButtonSubmit}>Detect</button> {/*將元件用波浪括弧起來會變成object! */}
                </div>
            </div>
        </div>

    )
}

export default ImageLinkForm;