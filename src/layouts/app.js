import { CssBaseline, Snackbar } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import theme from '../assets/themes/theme';
import { handleClearApproval } from '../reducers/payment';
import './app.css';
import GuestLayout from './layout_guest';
import MemberLayout from './layout_member';
import RegistrationLayout from './layout_registration';

const App = ({ approval, userUpdated, cardUpdated, user, token, validated, handleClearApproval }) => {
  const [ openAlert, setOpenAlert ] = React.useState(false)
  //sets up base layout depending on if the user is authenticated
  React.useEffect(() => {
    if ((approval && approval.stripe_obj) || (approval && approval.capture_amount) || userUpdated || cardUpdated) {
      setOpenAlert(true)
    }
  }, [approval, userUpdated, cardUpdated]);
  const getLayout = () => {
    // make sure all the user data is populated, otherwise just wait.  Errors are handled in Guest Layout via Login page
    if (!user || !token || !validated || !user.user_access) { return <GuestLayout /> }
    if (!user.user_access.plans) { return <RegistrationLayout /> }
    
    // if (!user || !user.token || !validated) { return <GuestLayout />}
    return <MemberLayout />
  }

  //the theme provider attaches the theme for common style elements.
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Snackbar open={openAlert} autoHideDuration={8000} onClose={() => {setOpenAlert(false); handleClearApproval()}}>
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            Your update was successful!
          </Alert>
        </Snackbar>
        {getLayout()}
      </BrowserRouter>
    </MuiThemeProvider>
  )
}

const mapState = (state) => {
  return {
    user: state.auth.user,
    userUpdated: state.auth.userUpdated,
    token: state.auth.token,
    validated: state.auth.validated,
    approval: state.payment.approval,
    cardUpdated: state.payment.cardUpdated
  }
}
const mapDispatch = (dispatch) => {
  return bindActionCreators({
      handleClearApproval
  }, dispatch )
}
export default connect(mapState, mapDispatch)(App)
