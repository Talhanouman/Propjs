import { Paper, Tab, Tabs } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    minHeight: 'calc(100vh - 80px - 64px)',
    paddingBottom: theme.spacing(15),
  },
  tabContainer: {
    borderRadius: 0,
    backgroundColor: theme.palette.primary.main
  },
  mainContainerContent: {
    padding: theme.spacing(2)
  }
}));

export default function MainContentContainer({menuItems, tabSelected, onTabSelected, children}) {
  const classes = useStyles();
  function handleChange(event, newValue) {
    onTabSelected(newValue)
  }
  return <div className={classes.root}>
    <Paper className={classes.tabContainer}>
      <Tabs 
        value={tabSelected}
        onChange={handleChange}
        indicatorColor="secondary"
        centered
      >
        {menuItems && menuItems.map((item, idx) => {
          return (
            <Tab disabled={item.disabled} key={idx} label={item.title} />
          )
        })}
      </Tabs>
    </Paper>
    <div className={classes.mainContainerContent}>
      {children}
    </div>
  </div>
}
