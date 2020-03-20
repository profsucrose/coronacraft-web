import React from 'react'
import Logo from '../static/callcraft-logo.png'

const Home = () => {
    return (
        <div className="container">
            <img className="logo" src={Logo} alt="CallCraft" />
            <h3 className="subtitle is-5">In-game Minecraft videocalling for makeshift online schooling.</h3>
            <p>Stream video + audio (via chat) in Minecraft!</p>
            <p>Join the CallCraft server and simply run <code>/create</code> to create a room and get started.</p>
        </div>
    )
}

export default Home