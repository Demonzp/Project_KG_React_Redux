import React from 'react';
import { Route } from 'react-router-dom';

const UnknownRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            children={() => (
                <Component {...rest}/>
            )}
        />
    );
}

export default UnknownRoute;