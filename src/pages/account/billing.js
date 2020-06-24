import { Card, CardActions, CardContent, CircularProgress, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import CreditCardElement from '../../components/creditCardElement'
import StyledButton from '../../components/styledButton'
import { handleUpdatePaymentMethod } from '../../reducers/payment'

const useStyles = makeStyles(theme => ({
  cardContent: {
    minHeight: theme.spacing(18)
  },
  cardAction: {
    minHeight: theme.spacing(6),
    display: 'flex', 
    justifyContent: 'space-between'
  }
}))
const Billing = ({payment_method, isLoading, cardUpdated, handleUpdatePaymentMethod}) => {
  const classes = useStyles()
  const [ showCardElement, setShowCardElement ] = React.useState(false)
  React.useEffect(() => {
    if (cardUpdated && showCardElement) {
      setShowCardElement(false)
    }
  }, [cardUpdated, showCardElement]);
  if (isLoading || !payment_method) { return <CircularProgress /> }
  return (
    <div>
      <Typography variant="h6" gutterBottom>Billing Details</Typography>
      <Grid container spacing={3}>
        <Grid item sm={6} xs={12}>
          <Card>
            <CardContent className={classes.cardContent}>
              <Typography id='title' gutterBottom variant="h6">Payment Methods</Typography>
              {showCardElement ? 
                <div style={{width: '100%'}}>
                  <CreditCardElement handleSubmit={handleUpdatePaymentMethod} />
                </div>
                : isLoading ? <CircularProgress /> :
                <Typography component='div' gutterBottom variant="body2">
                  {payment_method && payment_method.last4 && <div>{`**** **** **** ${payment_method.last4}`}</div>}
                  {payment_method && payment_method.exp_month && <div>{`exp ${payment_method.exp_month}/${payment_method.exp_year}`}</div>}
                </Typography>
              }
            </CardContent>
            <CardActions className={classes.cardAction} style={{justifyContent: 'flex-end'}}>
              <StyledButton
                handleButtonClick={() => setShowCardElement(!showCardElement)}
                label={showCardElement ? "Cancel" : "Update Billing"}
                style={{margin: 0, fontSize: 14, textTransform: 'capitalize', padding: '2px 8px'}}
              />
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}

const mapStateToProps = (state) => {
    return {
      user: state.auth.user,
      plans: state.payment.plans,
      isLoading: state.payment.isLoading,
      cardUpdated: state.payment.cardUpdated,
      payment_method: state.payment.payment_method
    }
}
const mapDispatch = (dispatch) => {
  return bindActionCreators({
    handleUpdatePaymentMethod
  }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatch)(Billing))
