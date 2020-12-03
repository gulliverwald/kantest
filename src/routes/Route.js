/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
    Route as ReactDOMRoute,
    Redirect,
} from 'react-router-dom';
import PropType from 'prop-types';
import { useAuth } from '../services/auth.service';

const Route = ({
    isPrivate = false,
    component: Component,
    ...rest
}) => {
    const { user } = useAuth();
    return (
        <ReactDOMRoute
            {...rest}
            render={({ location }) => {
                return isPrivate === !!user ? (
                    <Component />
                ) : (
                        <Redirect
                            to={{
                                pathname: isPrivate ? '/login' : '/user',
                                state: { from: location },
                            }}
                        />
                    );
            }}
        />
    );
}

Route.propType = {
    isPrivate: PropType.bool,
    component: PropType.object.isRequired,
}

PropType.checkPropTypes(Route.propType);

export default Route;
