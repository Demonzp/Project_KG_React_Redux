import { Route, Redirect } from 'react-router-dom';

import Spinner from '../components/Spinner/Spinner';
import RouteNames from '../constants/routeNames';
import useAuth from '../hooks/useAuth';

const GuestRoute = ({ component: Component, ...rest }) => {

    const {authAttempted, user} = useAuth();
  
    return (
        <Route
            children={({ location }) => (
                authAttempted
                    ?
                    (
                        !user
                            ?
                            <Component {...rest} />
                            :
                            <Redirect
                                to={{
                                    pathname: RouteNames.employees,
                                    state: { from: location }
                                }}
                            />
                    )
                    :
                    <Spinner />
            )}
        />
    );
}

export default GuestRoute;