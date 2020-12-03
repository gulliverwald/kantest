import React from 'react';
import { Switch } from 'react-router-dom';
import { AuthProvider } from '../services/auth.service';
import BoardUser from '../pages/BoardUser';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Route from './Route';

const Routes = () => {
    return (
        <AuthProvider>
            <Switch>
                <Route path='/login' exact component={Login} />
                <Route path='/register' exact component={Register} />
                <Route component={BoardUser} isPrivate path='/' />
            </Switch>
        </AuthProvider>
    );
};

export default Routes;