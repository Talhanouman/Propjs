import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Footer from '../components/footer';
import GuestHeader from '../components/header_guest';
import { Login } from '../pages';

const styles = theme => ({
    root: {
        color: theme.palette.textOnPrimary,
        backgroundColor: theme.palette.background.main,
        backgroundSize: 'cover',
        minHeight: '100vh'
    },
    content: {
        padding: theme.spacing(0, 6, 10),
    }
})

// provides a path to the login page.  Users will land here if they are not authenticated and can only get to the login page
const GuestLayout = ({ classes }) => (
    <div className={classes.root}>
    <GuestHeader />
    <div className={classes.content}>
        <Switch>
            <Route path='/login' component={Login} />
            <Redirect to='/login' />
        </Switch>
    </div>
    <Footer />
    </div>
)

export default withStyles(styles)(GuestLayout)
