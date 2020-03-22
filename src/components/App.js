import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import Home from './Home'
import Room from './room'
import history from '../history'
import About from './About'
import HowToUse from './HowToUse'
import NotFound from './NotFound'

import '../css/style.css'

const App = () => {
    return (
        <div>
            <Router history={history}>
                <div>
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/room/:id" exact component={Room} />
                        <Route path="/about" exact component={About} />
                        <Route path="/howtouse" exact component={HowToUse} />
                        <Route exact component={NotFound} />
                    </Switch>
                </div>
            </Router>
        </div>
    )
}

export default App