import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
const pack = require('../../package.json')

const styles = theme => ({
  footer: {
    position: 'fixed',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: theme.palette.primary.main,
    height: theme.spacing(8),
    padding: theme.spacing(1),
    '& .content': {
      textAlign: 'center',
    },
    '& h6': {
      color: theme.palette.textOnPrimary,
    },
  },
  spacer: {
    display: 'inline',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
});

const Footer = ({ classes }) => (
  <footer className={classes.footer}>
    <Typography title={pack.version} variant="subtitle2" align="center" gutterBottom>
      {"All rights reserved. Property Leads " + (new Date().getFullYear())}
    </Typography>
    <Typography variant="subtitle2" align="center">
      Terms & Conditions
      <div className={classes.spacer}>&bull;</div>
      Privacy Policy
    </Typography>
  </footer>
);

export default withStyles(styles)(Footer);
