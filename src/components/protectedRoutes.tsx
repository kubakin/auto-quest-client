import React, { Component, FC } from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({component: Component, condition, gameData,  ...rest}) => {
    return (
        <Route {...rest} render={props => {
            if (condition) {
                return <Component game={gameData} user={condition} {...rest} {...props}/>;
            } else {
                return <Redirect to={
                    {
                        pathname: '/team',
                        state: {
                            from: props.location
                        }
                    }
                }/>;
            }
        }}/>
    );
};

export default ProtectedRoute;
