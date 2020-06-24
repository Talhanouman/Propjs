
import { CircularProgress, Paper, Typography } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import React from 'react';

const COGNITO_URL = process.env.REACT_APP_COGNITO

const styles = theme => ({
  main: {
    width: 'auto',
    maxWidth: '600px',
    display: 'block', // Fix IE 11 issue.
    margin: 'auto',
    color: theme.palette.primary.main,
    padding: theme.spacing(2, 0)
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: theme.spacing(20, 3),
    marginBottom: theme.spacing(12)
  }
});

function LoginView(props) {
  const { classes, auth } = props  
  const getErrorMessage = (e) => {
    const error = e.toLowerCase()
    if (error.indexOf('timeout') >= 0 || error.indexOf('unable to import module') >= 0) {
      return <span>We had a problem.  Please try again later</span>
    }
    return <span>This account appears to be inactive. To create a new account, or restore this account please <a href='https://propertyleads.com'>click here</a>.</span>
  }
  return (
    <main className={classes.main}>
      <Paper className={classes.paper}>
        <Typography color="error" variant="h6">
          {auth.error ? getErrorMessage(auth.error) : <CircularProgress size={96} />}
        </Typography>
        {auth.error && <div style={{marginTop: 64}}>
          <a href={COGNITO_URL}>Return to Login</a>
        </div>}
      </Paper>
    </main>
  );
}

export default withStyles(styles)(LoginView);
