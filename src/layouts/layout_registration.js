import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
// import { bindActionCreators } from 'redux'
// import { connect } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'
import Footer from '../components/footer'
import GuestHeader from '../components/header_guest'
import { Registration } from '../pages'

const useStyles = makeStyles(theme => ({
    root: {
        color: theme.palette.textOnPrimary,
        backgroundColor: theme.palette.background.main,
        backgroundSize: 'cover',
        minHeight: '100vh'
    },
    content: {
        padding: theme.spacing(0, 6, 10),
    }
}));

// Provides registration verification and plan selection for new users.
// Authenticated users will automatically load this base page from the app.js page when missing the user_access object
const RegistrationLayout = () => {
    const classes = useStyles()
    return (
    <div className={classes.root}>
        <GuestHeader />
        <div className={classes.content}>         
            <Switch>
                {/* <Route path='/' exact component={Home} /> */}
                <Route path='/registration' exact component={Registration} />
                <Redirect to='/registration' />
            </Switch>
        </div>
        <Footer />
    </div>
    )
}

export default RegistrationLayout
