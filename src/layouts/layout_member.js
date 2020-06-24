import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { createMuiTheme, makeStyles, MuiThemeProvider } from '@material-ui/core/styles'
import AccountIcon from '@material-ui/icons/AccountCircle'
import BuildIcon from '@material-ui/icons/Build'
import HelpIcon from '@material-ui/icons/Help'
import ListIcon from '@material-ui/icons/ListAlt'
import TrackIcon from '@material-ui/icons/TrackChanges'
import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Route, Switch, withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import Footer from '../components/footer'
import MemberHeader from '../components/header_member'
import { Account, FAQs, Help, ListBuilder, ListManager, ListViewer, SkipTracing, Tickets, Upgrade, Videos } from '../pages'
import { handleGetNotifications } from '../reducers/notifications'
import { handleGetPaymentMethod, handleSetDatasource } from '../reducers/payment'
import { handleGetDefaultCriteria } from '../reducers/search'

const useStyles = makeStyles(theme => ({
    root: {
        minWidth: 950
    },
    drawer: {
        // flexShrink: 0,
    },
    drawerPaper: {
        width: theme.sizes.drawerWidth,
        marginTop: theme.spacing(8),
        paddingTop: theme.spacing(3),
        borderTop: 'solid 1px #ccc'
    },
    content: {
      paddingLeft: theme.sizes.drawerWidth,
      paddingBottom: theme.spacing(10)
    },
}));

const getMuiTheme = () => createMuiTheme({
    overrides: {
        MuiListItemIcon: {
            root: {
                minWidth: 32
            }
        },
        MuiListItemText: {
            primary: {
                fontSize: 14
            },
        },
        MuiSvgIcon: {
            root: {
                width: 20
            }
        }
    }
})

// Provides navigation and menu options for authenticated users.
// Authenticated users will automatically load this base page from the app.js page.
const MemberLayout = ({history, handleSetDatasource, handleGetNotifications, handleGetDefaultCriteria, handleGetPaymentMethod}) => {
    React.useEffect(() => {
        handleGetNotifications()
        handleGetDefaultCriteria()
        handleGetPaymentMethod()
    }, [handleGetNotifications, handleGetDefaultCriteria, handleGetPaymentMethod ]);
    const classes = useStyles()
    const handleClick = (path) => {
        handleSetDatasource(path)
        history.push(path)
    }

    return (
    <div className={classes.root}>
        <MemberHeader />
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <MuiThemeProvider theme={getMuiTheme()}>
            <List style={{width: '100%'}}>
                <ListItem onClick={() => handleClick('/my-lists')} button>
                    <ListItemIcon>
                        <ListIcon />
                    </ListItemIcon>
                    <ListItemText primary={'My Lists'} />
                </ListItem>
                <ListItem onClick={() => handleClick('/list-builder')} button>
                    <ListItemIcon>
                        <BuildIcon />
                    </ListItemIcon>
                    <ListItemText primary={'List Builder'} />
                </ListItem>
                <ListItem onClick={() => handleClick('/skip-tracing')} button>
                    <ListItemIcon>
                        <TrackIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Skip Tracing'} />
                </ListItem>
            </List>
            <List style={{position: 'absolute', bottom: 160, width: '100%'}}>
                <ListItem onClick={() => handleClick('/help')} button>
                    <ListItemIcon>
                        <HelpIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Help'} />
                </ListItem>
                <ListItem onClick={() => handleClick('/account')} button>
                    <ListItemIcon>
                        <AccountIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Account'} />
                </ListItem>
            </List>
            </MuiThemeProvider>
        </Drawer>
        <main className={classes.content}>   
            <Switch>
                {/* <Route path='/' exact component={Home} /> */}
                <Route path='/my-lists' exact component={ListManager} />
                <Route path='/list/:uuid' component={ListViewer} />
                <Route path='/list-builder' exact component={ListBuilder} />
                <Route path='/regional-upgrade' exact component={Upgrade} />
                <Route path='/skip-tracing' exact component={SkipTracing} />
                <Route path='/help' exact component={Help} />
                <Route path='/faqs' exact component={FAQs} />
                <Route path='/videos' exact component={Videos} />
                <Route path='/support-tickets' exact component={Tickets} />
                <Route path='/account' exact component={Account} />
                <Redirect to='/my-lists' />
            </Switch>
        </main>
        <Footer />
    </div>
    )
}

const mapDispatch = (dispatch) => {
    return bindActionCreators({
        handleSetDatasource,
        handleGetNotifications,
        handleGetDefaultCriteria,
        handleGetPaymentMethod
    }, dispatch )
}

export default withRouter(connect(null, mapDispatch)(MemberLayout))
