import React from 'react'

export default (props) => {
    return (
        <div>
            <input 
                className="slider is-fullwidth" 
                step="1" 
                min="50" 
                max="500" 
                value={props.value} 
                type="range" 
                onChange={props.onBrightnessChange}
            />
        </div>
    )
}
