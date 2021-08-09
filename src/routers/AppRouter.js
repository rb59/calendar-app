import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Redirect,
} from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { startCheking } from '../actions/auth';
import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
// cd
export const AppRouter = () => {
    const dispatch = useDispatch();
    const {checking, uid} = useSelector( state => state.auth );

    useEffect(() => {
        dispatch(startCheking());
    }, [dispatch]);
    if (checking) {
        return <h5>Espere...</h5>;
    }
    const isLoggedIn = !!uid;
 
    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute isLoggedIn={isLoggedIn} exact path="/login" component={LoginScreen} />
                    <PrivateRoute isLoggedIn={isLoggedIn} exact path="/" component={CalendarScreen} />
                    <Redirect to="/" />
                </Switch>
            </div>
        </Router>
    );
};
