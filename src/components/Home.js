import React from 'react'
import Logo from '../static/callcraft-logo.png'
import Background from '../static/background.jpg'
import history from '../history'

const Home = () => {
    return (
        <div>
            <div className="container-ui black-background">
                <img className="background" src={Background} alt="Background" />
            </div>
            <div className="container-ui">
                <div className="header">
                    <img className="logo" src={Logo} alt="CallCraft" />
                    <h3 className="yellow-text">Zoom in Minecraft!</h3>
                </div>
                <div className="menu">
                    <button className="menu-button" onClick={() => history.push('/howtouse')}>How to Use</button>
                    <button className="menu-button" onClick={() => history.push('/about')}>About</button>
                </div>
                
            </div>
        </div>
    )
}

export default Home