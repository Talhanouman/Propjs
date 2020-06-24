import React from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import AddRecordIcon from '@material-ui/icons/GridOn'
import RemoveRecordIcon from '@material-ui/icons/GridOff'

const useStyles = makeStyles(theme => ({
  emptyBox: {
    textAlign: 'center',
    width: '100%',
    padding: '16px 0',
  },
  notificationItem: {
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
    borderBottom: 'solid 1px #e7e7ea',
    padding: 8,
  },
  subHeader: {
    backgroundColor: '#f5f6f7',
    borderBottom: 'solid 1px #e7e7ea',
    padding: '4px 8px'
  },
  subTitle: {
    fontWeight: 'bold',
    color: '#93969d',
    fontSize: 12
  },
}))

const NotificationItem = ({  children, avatarIcon, closeNotifications }) => {
  const classes = useStyles()
  return <div className={classes.notificationItem}>
    <Link onClick={() => closeNotifications()} to={'/'} style={{marginRight: 8}}>
      {avatarIcon}
    </Link>
    <Typography variant="caption">
      {children}
    </Typography>
  </div>
}

const NotificationListDisplay = ({items, closeNotifications}) => {
  return <div>
    {items.map((item, idx) => {
    switch (item.type) {
      case 'records_added':
        return <NotificationItem
          key={idx}
          avatarIcon={<AddRecordIcon />}
          closeNotifications={closeNotifications}>
            New Records in <Link onClick={() => closeNotifications()} to={`/list/${item.list_uuid}`}>{item.list_name}</Link> list.
        </NotificationItem>
      case 'records_removed':
        return <NotificationItem
          key={idx}
          avatarIcon={<RemoveRecordIcon />}
          closeNotifications={closeNotifications}>
            Records removed from <Link onClick={() => closeNotifications()} to={`/list/${item.list_uuid}`}>{item.list_name}</Link> list.
        </NotificationItem>
      default:
        return <React.Fragment key={idx} />
    }
  })}</div>
}

export default function NotificationPopover({ newItems, oldItems, closeNotifications }) {
  const classes = useStyles()
  return (
    <React.Fragment>
      {!newItems || newItems.length === 0
        ? <div className={classes.emptyBox}>
          No recent notifications
        </div>
        : <div>
          <div className={classes.subHeader}>
            <Typography variant="subtitle2" className={classes.subTitle}>NEW</Typography>
          </div>
          <NotificationListDisplay items={newItems} closeNotifications={closeNotifications} />
        </div>
      }
      {oldItems && oldItems.length > 0 && <div>
        <div className={classes.subHeader}>
          <Typography variant="subtitle2" className={classes.subTitle}>EARLIER</Typography>
        </div>
        <NotificationListDisplay items={oldItems} closeNotifications={closeNotifications} />
      </div>  
      }
    </React.Fragment>
  )
}
