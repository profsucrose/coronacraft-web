import React from 'react'
import history from '../history'

export default () => {
    return (
        <div>
            
            <div className="options">
                <p className="options-text">How to Use</p>
                <div className="about-text">
                    <p>To use, join the server IP <code>1.tcp.ngrok.io:29458</code></p>
                    <p>From there, run</p> 
                    <p><code>/create</code> to create your own meeting room</p>
                    <p>after running that command, you will be teleported to your newly generated room and be given a 9-digit room code (ex. "123-456-789")</p>
                    <p><code>/join {"<room_code>"}</code> to join an existing room</p>
                    <p><code>/resetview</code> to teleport back to viewing area while in a room</p>
                    <p>After your room has been generated / having joined a room, you will be given a link in the form of <code>callcraft.co/room/{"<room_code>"}</code> which will have its own interface. To use, simply select the channel you'd like to stream your camera to (each channel number corresponds to a frame in your room) and click <code>Start Streaming</code>. Audio should work automatically after doing this and you should see yourself in Minecraft blocks in whichever frame you chose and transcriptions of what you're saying sent in your room's chat.</p>
                    <p>Have fun!</p>
                </div>
                <button className="menu-button" onClick={() => history.push('/')}>Back</button>
            </div>
        </div>
    )
}
