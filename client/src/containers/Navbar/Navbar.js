import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

import cssStyles from './Navbar.module.css';

import Homepage from '../../components/Homepage/Homepage';
import Employee from '../Employee/Employee';
import Signin from '../Signin/Signin';
import Signup from '../Signup/Signup';
import GuestRoute from '../../middlewares/guest';
import UserRoute from '../../middlewares/user';
import Spinner from '../../components/Spinner/Spinner';
import useAuth from '../../hooks/useAuth';
import RouteNames from '../../constants/routeNames';
import UnknownRoute from '../../middlewares/unknown';
import Unknown from '../404/404';

const Navbar = () => {
 
    const {authAttempted, user, signout} = useAuth();

    return (
        <Router>
            <nav className={cssStyles.nav}>
                <h3>Project_KG</h3>
                <ul className={cssStyles.navLinks}>
                    <Link className={cssStyles.navRefs} to={RouteNames.home}>
                        <li>Homepage</li>
                    </Link>
                    {authAttempted?
                        <React.Fragment>
                        {user?
                            <React.Fragment>
                                <Link className={cssStyles.navRefs} to={RouteNames.employees}>
                                    <li>Employees</li>
                                </Link>
                                <Link className={cssStyles.navRefs} to={RouteNames.home} onClick={signout}>
                                    <li>SignOut</li>
                                </Link>
                            </React.Fragment>:
                            null
                        }
                        {!user?
                            <React.Fragment>
                                <Link className={cssStyles.navRefs} to={RouteNames.signin}>
                                    <li>SignIn</li>
                                </Link>
                                <Link className={cssStyles.navRefs} to={RouteNames.signup}>
                                    <li>SignUp</li>
                                </Link>
                            </React.Fragment>:
                            null
                        }
                        </React.Fragment>:
                        <Spinner />
                    }
                </ul>
            </nav>

            <Switch>
                <Route exact path={RouteNames.home} component={Homepage} />
                <UserRoute path={RouteNames.employees} component={Employee} />
                <GuestRoute path={RouteNames.signin} component={Signin} />
                <GuestRoute path={RouteNames.signup} component={Signup} />
                <UnknownRoute component={Unknown}/>
            </Switch>
        </Router>
    );
};

export default Navbar;