import React from 'react'
import history from '../history'

export default () => {
    return (
        <div>
            
            <div className="options">
            <p className="options-text">About</p>
                <div className="about-text">CallCraft is a server where you can videocall each other in-game in Minecraft! It was created during a Slackathon (online hackathon via Slack) on <a href="hackclub.com">HackClub</a> and we've been working to improve it ever since. The project is completely open-source and the code for the Spigot plugin that makes the server work is <a href="github.com/profsucrose/coronacraft">here</a> and the source code for this web client is <a href="github.com/profsucrose/coronacraft-web">here</a>.</div>
                <button className="menu-button" onClick={() => history.push('/')}>Back</button>
            </div>
        </div>
    )
}
