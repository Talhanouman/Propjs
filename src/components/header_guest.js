import React from 'react'
import { withRouter } from 'react-router-dom';
import { AppBar, Toolbar } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        display: 'flex'
    },
    appBar: {
        width: "100%",
        backgroundColor: "#FFF",
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(["margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    grow: {
        flexGrow: 1,
    },
    logo: {
        width: '220px',
        cursor: 'pointer'
    }
})

const Header = ({ history, classes }) => {
    return (
    <div className={classes.root}>
        <AppBar elevation={0} position="static" className={classes.appBar}>
            <Toolbar>
                <img alt="Property Leads" onClick={() => history.push('/')} className={classes.logo} src={require('../assets/images/logo.png')} />
                <div className={classes.grow} />
            </Toolbar>
        </AppBar>
    </div>
    )
}

export default withRouter(withStyles(styles)(Header))
