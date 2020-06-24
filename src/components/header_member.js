import { AppBar, Badge, Card, CardContent, CardHeader, ClickAwayListener, IconButton, Paper, Popper, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowUpIcon from '@material-ui/icons/ArrowDropUp';
import NotificationsIcon from '@material-ui/icons/Notifications';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { handleLogout } from '../reducers/auth';
import { handleMarkNotificationsRead } from '../reducers/notifications';
import NotificationPopover from './notificationPopover';
import StyledButton from './styledButton';

const useStyles = makeStyles(theme => ({
  appBar: {
    width: "100%",
    backgroundColor: "#FFF",
    zIndex: theme.zIndex.drawer + 1,
    height: theme.spacing(8)
  },
  grow: {
    flexGrow: 1,
  },
  logo: {
    width: '220px',
    cursor: 'pointer'
  },
  notificationsMenu: {
    zIndex: 2000
  },
  notificationMenuRoot: {
    minHeight: 50,
    flex: '1 1 0%',
    height: 'auto',
    overflowY: 'auto'
  },
}));

function MemberHeader({ history, user, newItems, oldItems, handleMarkNotificationsRead, handleLogout }) {
  const classes = useStyles();
  const anchorNotificationsRef = React.useRef(null)
  const [notificationsMenu, openNotificationsMenu] = React.useState(false);
  function handleCloseNotifications () {
    if (newItems && newItems.length > 0) {
      handleMarkNotificationsRead(newItems.map(x => x.notification_id))
    }
    openNotificationsMenu(false)
  }
  return (
    <React.Fragment>
      <AppBar elevation={0} position="static" className={classes.appBar}>
        <Toolbar>
          <img alt="Property Leads" onClick={() => history.push('/')} className={classes.logo} src={require('../assets/images/logo.png')} />
          <div className={classes.grow} />
          <IconButton title='Notifications' ref={anchorNotificationsRef} onClick={() => openNotificationsMenu(true)}>
              <Badge color="primary" variant="dot" invisible={!newItems || newItems.length === 0}>
                <NotificationsIcon color="secondary" />
              </Badge>
          </IconButton>
          <StyledButton label="Logout" style={{padding: '4px 16px'}} handleButtonClick={handleLogout}>Logout</StyledButton>
        </Toolbar>
      </AppBar>
      <Popper open={notificationsMenu} className={classes.notificationsMenu} anchorEl={anchorNotificationsRef.current} placement="bottom-end">
        <ClickAwayListener onClickAway={() => handleCloseNotifications()}>
          <Paper style={{position: 'relative', minWidth: 300}}>
            <ArrowUpIcon style={{position: 'absolute', color: '#FFF', top: -22, right: 4, fontSize: 40}} />
            <Card>
              <CardHeader
                disableTypography={true}
                style={{borderBottom: 'solid 1px #e7e7ea', padding: '4px 8px'}}
                title={<Typography color="secondary" variant="subtitle2" style={{fontWeight: 'bold', fontSize: 12}}>Notifications</Typography>}
              />
              <CardContent style={{padding: 0}}>
                <div className={classes.notificationMenuRoot} style={{maxHeight: 400}}>
                  <NotificationPopover
                    newItems={newItems}
                    oldItems={oldItems}
                    closeNotifications={() => handleCloseNotifications()} />
                </div>
              </CardContent>
            </Card>
          </Paper>
        </ClickAwayListener>
      </Popper>
    </React.Fragment>
  );
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    handleLogout,
    handleMarkNotificationsRead,
  }, dispatch)
}
const mapState = (state) => {
  return {
    user: state.auth.user,
    newItems: state.notifications.list.filter(y => !y.notification_read),
    oldItems: state.notifications.list.filter(x => x.notification_read),
  }
}

export default withRouter(connect(mapState, mapDispatchToProps)(MemberHeader));
