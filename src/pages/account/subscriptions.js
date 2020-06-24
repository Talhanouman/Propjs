import { Card, CardActions, CardContent, CircularProgress, Collapse, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import StyledButton from '../../components/styledButton'

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
const Subscriptions = ({history, user, plans}) => {
  const classes = useStyles()
  const [ expanded, setExpanded ] = React.useState()
  const [ national, setNational ] = React.useState()
  const [ regional, setRegional ] = React.useState()
  React.useEffect(() => {
    if (user && user.user_access && user.user_access.plans) {
      const subscribedPlans = user.user_access.plans || []
      const nationalPlan = subscribedPlans.find(x => x.active && x.type === 'national')
      const regionalPlan = subscribedPlans.find(x => x.active && x.type === 'regional')
      const nationalDetails = nationalPlan && nationalPlan.allowance ? plans.find(x => x.records === Number(nationalPlan.allowance)) : {}
      const regionalDetails = plans.find(x => x.id === 'pro')
      
      setNational(nationalPlan && nationalPlan.type ? {...nationalPlan, ...nationalDetails} : null)
      setRegional(regionalPlan && regionalPlan.type ? {...regionalPlan, ...regionalDetails} : null)
    }
  }, [user, plans]);
  if (!regional && !national) { return <CircularProgress /> }
  return (
    <div>
      <Typography variant="h6" gutterBottom>Subscriptions</Typography>
      <Grid container spacing={3}>
        <Grid item sm={6} xs={12}>
          <Card>
              <CardContent className={classes.cardContent}>
                <Typography id='title' gutterBottom variant="h6">Your Plan</Typography>
                <Typography component="div" gutterBottom color="primary" style={{fontWeight: 'bold'}} variant="body1">
                  {regional ? regional.name : national.name}
                </Typography>
                <React.Fragment>
                  <Typography component="div" id='records' gutterBottom variant="body2">
                    {regional ? <div>Unlimited regional records per month<br />15000 national records per month</div> :
                      <div>{national.allowance} records per month</div>}
                  </Typography>
                    <Typography component="div" variant="body2">
                      {regional ? <div>${regional.annually} / year</div> :
                        <div>${national.monthly} / month (${national.annually} / year)</div>
                      }
                    </Typography>
                </React.Fragment>
              </CardContent>
              <CardActions className={classes.cardAction}>
                <Typography variant="body2" style={{color: 'blue', cursor: 'pointer', textDecoration: 'underline'}} onClick={() => setExpanded(expanded ? '' : 'plan')}>
                  Learn More
                </Typography>
                <StyledButton
                    handleButtonClick={() => console.warn('Upgrade Now')}
                    label="Upgrade Now"
                    style={{margin: 0, fontSize: 14, textTransform: 'capitalize', padding: '2px 8px'}}
                />
              </CardActions>
              <Collapse in={expanded === 'plan'} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography variant="body2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet quam et quam vehicula fringilla. Vestibulum aliquam ligula at erat vulputate dapibus eu fringilla diam. Cras vel augue ac elit laoreet dignissim ut quis urna. Proin ultrices eleifend ligula vel pretium. Maecenas elementum mauris orci, sit amet lacinia ipsum tincidunt vel. Quisque sed euismod ligula, ac eleifend dolor. Maecenas sit amet consectetur velit, et vestibulum metus. Proin lobortis tristique justo iaculis bibendum. Aliquam ac luctus lorem. Suspendisse quis ligula elit. Suspendisse scelerisque nibh sit amet ipsum tincidunt, nec maximus nisl pulvinar. Nam magna ligula, faucibus ac dapibus ut, scelerisque sit amet lectus.
                  </Typography>
                </CardContent>
              </Collapse>
            </Card>
        </Grid>
        <Grid item sm={6} xs={12}>
          <Card>
            <CardContent className={classes.cardContent}>
              <Typography id='title' gutterBottom variant="h6">Total Exports Remaining</Typography>
              <Typography gutterBottom variant="body2">
                {regional ? "National exports" : "Exports"} used this billing period: <span style={{fontWeight: 'bold'}}>{national.allowance_used}</span>
              </Typography>
              <Typography gutterBottom variant="body2">
                {regional ? "National exports" : "Exports"} remaining this billing period: <span style={{fontWeight: 'bold'}}>{Number(national.allowance) - Number(national.allowance_used)}</span>
              </Typography>
            </CardContent>
            <CardActions className={classes.cardAction}>
              <Typography variant="body2" style={{color: 'blue', cursor: 'pointer', textDecoration: 'underline'}} onClick={() => setExpanded(expanded ? '' : 'exports')}>
                Learn More
              </Typography>
            </CardActions>
            <Collapse in={expanded === 'exports'} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography variant="body2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet quam et quam vehicula fringilla. Vestibulum aliquam ligula at erat vulputate dapibus eu fringilla diam. Cras vel augue ac elit laoreet dignissim ut quis urna. Proin ultrices eleifend ligula vel pretium. Maecenas elementum mauris orci, sit amet lacinia ipsum tincidunt vel. Quisque sed euismod ligula, ac eleifend dolor. Maecenas sit amet consectetur velit, et vestibulum metus. Proin lobortis tristique justo iaculis bibendum. Aliquam ac luctus lorem. Suspendisse quis ligula elit. Suspendisse scelerisque nibh sit amet ipsum tincidunt, nec maximus nisl pulvinar. Nam magna ligula, faucibus ac dapibus ut, scelerisque sit amet lectus.
                </Typography>
              </CardContent>
            </Collapse>
          </Card>
        </Grid>
        <Grid item sm={6} xs={12}>
          <Card>
            <CardContent className={classes.cardContent}>
              <Typography id='title' gutterBottom variant="h6">Regional Data Markets</Typography>
              <div>
                {regional && regional.metros && regional.metros.length > 0 ?
                  regional.metros.map((metro, index) => (
                    <Typography variant="body2" key={index}>{metro}</Typography>
                  ))
                  : <Typography variant="body2">N/A</Typography>}
              </div>
            </CardContent>
            <CardActions className={classes.cardAction}>
              <Typography variant="body2" style={{color: 'blue', cursor: 'pointer', textDecoration: 'underline'}} onClick={() => setExpanded(expanded ? '' : 'markets')}>
                Learn More
              </Typography>
              <StyledButton
                handleButtonClick={() => history.push('/regional-upgrade')}
                label="Add/Remove Markets"
                style={{margin: 0, fontSize: 14, textTransform: 'capitalize', padding: '2px 8px'}}
              />
            </CardActions>
            <Collapse in={expanded === 'markets'} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography variant="body2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet quam et quam vehicula fringilla. Vestibulum aliquam ligula at erat vulputate dapibus eu fringilla diam. Cras vel augue ac elit laoreet dignissim ut quis urna. Proin ultrices eleifend ligula vel pretium. Maecenas elementum mauris orci, sit amet lacinia ipsum tincidunt vel. Quisque sed euismod ligula, ac eleifend dolor. Maecenas sit amet consectetur velit, et vestibulum metus. Proin lobortis tristique justo iaculis bibendum. Aliquam ac luctus lorem. Suspendisse quis ligula elit. Suspendisse scelerisque nibh sit amet ipsum tincidunt, nec maximus nisl pulvinar. Nam magna ligula, faucibus ac dapibus ut, scelerisque sit amet lectus.
                </Typography>
              </CardContent>
            </Collapse>
          </Card>
        </Grid>
        <Grid item sm={6} xs={12}>

        </Grid>
      </Grid>
    </div>
  )
}

const mapStateToProps = (state) => {
    return {
      user: state.auth.user,
      plans: state.payment.plans,
    }
}
const mapDispatch = (dispatch) => {
  return bindActionCreators({

  }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatch)(Subscriptions))
