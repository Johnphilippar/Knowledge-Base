import React, { Component } from 'react';
import config from '../../package.json';
import KBComponent from '../views/KBComponent';
import Error401 from '../views/Error401';
import packageConfig from '../../package.json';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import ProtectedRoute from '../Guard/ProtectedRoute';


class RouterComponent extends Component {
    render() {
        return (
            <div>
                <Router>
                    <div className="main">
                        <Switch>
                            <ProtectedRoute exact strict path={packageConfig.configuration.BaseFolderName + "/"} component={KBComponent} />
                            <Route path={"*"} component={Error401} />
                        </Switch>
                    </div>
                </Router>
            </div >
        );
    }
}

export default RouterComponent;