import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import MarketRequestDialog from '../../components/marketRequestDialog'
import { handleGetMetroStates } from '../../reducers/payment'
import RegionalOptions from '../registration/regionalOptions'

const useStyles = makeStyles(theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    margin: '16px 24px',
    color: theme.palette.primary.main,
    // padding: theme.spacing(2, 0)
  },
}));

const UpgradeContainer = ({history, approval, handleGetMetroStates}) => {
  const [marketRequest, setMarketRequest] = React.useState(false)
  React.useEffect(() => {
      handleGetMetroStates()
  }, [handleGetMetroStates]);
  React.useEffect(() => {
    if (approval) {
      history.push('/my-lists')
    }
  }, [history, approval]);
  const classes = useStyles()
  return (
    <main className={classes.main}>
      <MarketRequestDialog
          open={marketRequest}
          toggleDialog={() => setMarketRequest(false)}
      />
      <div style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
        <Typography variant="h6">Select Market</Typography>
        <Typography onClick={() => setMarketRequest(true)} style={{color: 'blue', textDecoration: 'underline', cursor: 'pointer'}}>Don't see the market you want?</Typography>
      </div>
      <RegionalOptions />
    </main>
  )
}
const mapStateToProps = (state) => {
  return { 
    approval: state.payment.approval
  }
}
const mapDispatch = (dispatch) => {
  return bindActionCreators({
    handleGetMetroStates
  }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatch)(UpgradeContainer))
