import React from 'react';
import Characters from "./pages/Characters";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import SoloChar from "./components/SoloChars/SoloChar";

import Favorite from "./pages/Favorite";
import HeaderCard from "./components/Header/Header";

function App(props) {

    return (
        <Router>
            <div>
                <HeaderCard/>
                <Switch>
                    <Route path='/' exact {...props} component={Characters}/>
                    <Route path="/favorite"  {...props} component={Favorite}/>
                    <Route path="/:id"  {...props} component={SoloChar}/>
                </Switch>
            </div>
        </Router>
    );
}


export default App;
