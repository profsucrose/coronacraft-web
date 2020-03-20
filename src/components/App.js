import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import Home from './Home'
import Room from './room'
import history from '../history'
import Footer from './Footer'

import '../css/style.css'

const App = () => {
    return (
        <div>
            <Router history={history}>
                <div>
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/room/:id" exact component={Room} />
                    </Switch>
                </div>
            </Router>
            <Footer />
        </div>
    )
}

export default App