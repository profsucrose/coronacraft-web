import React from 'react'

export default (props) => {
    return (
        <div>
            <div className="select">
                <select 
                    className="channel-select" 
                    onChange={props.onChannelSelect}
                    value={props.value}
                >
                    <option value="none" readOnly disabled>Set Stream Channel</option>
                    <option value="one">1</option>
                    <option value="two">2</option>
                    <option value="three">3</option>
                    <option value="four">4</option>
                </select>
            </div>
        </div>
    )
}
