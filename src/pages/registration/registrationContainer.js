import { ButtonBase, Card, CardActions, CardContent, Collapse, Grid, Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { handleGetMetroStates } from '../../reducers/payment'
import PaymentForm from './paymentForm'
import RegionalOptions from './regionalOptions'

const useStyles = makeStyles(theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    margin: 'auto',
    color: theme.palette.primary.main,
    padding: theme.spacing(2, 0)
  },
  paper: {
    backgroundColor: theme.palette.background.main,
    padding: theme.spacing(0),
    minHeight: theme.spacing(80)
  },
  card: {
    backgroundColor: '#fff',
    '&:hover': {
      borderBottom: `solid 2px ${theme.palette.primary.dark}`,
    },
    '&.active': {
      borderBottom: `solid 2px ${theme.palette.primary.dark}`,
      borderTop: `solid 2px ${theme.palette.primary.dark}`,
    },
  },
  cardHeight: {
    minHeight: theme.spacing(22),
  },
  cardTitle: {
    color: theme.palette.primary.main,
    fontWeight: 500
  },
  learnMore: {
    color: 'blue',
    textDecoration: 'underline',
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const RegistrationContainer = ({handleGetMetroStates, plans}) => {
  const [ selectedPlan, setSelectedPlan ] = React.useState()
  const [expanded, setExpanded] = React.useState();
  React.useEffect(() => {
    handleGetMetroStates('regional')
  }, [handleGetMetroStates]);
  const classes = useStyles()
  return (
    <main className={classes.main}>
      <Paper className={classes.paper} elevation={0}>
        <Typography gutterBottom variant='h6'>Select a Plan:</Typography>
        <Grid container justify="center" spacing={3} style={{marginBottom: 32}}>
          {plans.filter(x => x.id !== 'skiptrace').map(plan => (
            <Grid key={plan.id} item md={4} xs={6}>
              <Card className={classNames(classes.card, {'active': selectedPlan && selectedPlan.id === plan.id})}>
              <ButtonBase style={{width: '100%'}}
                onClick={() => {setExpanded(''); setSelectedPlan(plan)}}>
                <CardContent className={classes.cardHeight}>
                  <Typography id='title' gutterBottom variant="h5" className={classes.cardTitle}>{plan.name}</Typography>
                  {plan.records ? <React.Fragment><Typography id='records' gutterBottom variant="subtitle1">
                    {plan.records} records per month
                    </Typography>
                    <Typography variant="subtitle2" className={classes.subtext} color="textSecondary" component="p">
                      ${plan.monthly} / month<br />OR<br />
                      ${plan.annually} / year
                    </Typography></React.Fragment>
                  : <React.Fragment><Typography id='records' gutterBottom variant="subtitle1">
                      All records <br />for selected localities
                    </Typography>
                    <Typography variant="subtitle2" className={classes.subtext} color="textSecondary" component="p">
                      ${plan.annually} / year
                    </Typography></React.Fragment>
                  }
                </CardContent>
              </ButtonBase>
              <CardActions disableSpacing>
                {plan.records ? <Typography style={{color: 'blue', cursor: 'pointer', textDecoration: 'underline'}} onClick={() => setExpanded(expanded ? '' : plan.id)}>
                  Learn More
                </Typography> : <Typography>&nbsp;</Typography>}
              </CardActions>
              <Collapse in={expanded === plan.id} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet quam et quam vehicula fringilla. Vestibulum aliquam ligula at erat vulputate dapibus eu fringilla diam. Cras vel augue ac elit laoreet dignissim ut quis urna. Proin ultrices eleifend ligula vel pretium. Maecenas elementum mauris orci, sit amet lacinia ipsum tincidunt vel. Quisque sed euismod ligula, ac eleifend dolor. Maecenas sit amet consectetur velit, et vestibulum metus. Proin lobortis tristique justo iaculis bibendum. Aliquam ac luctus lorem. Suspendisse quis ligula elit. Suspendisse scelerisque nibh sit amet ipsum tincidunt, nec maximus nisl pulvinar. Nam magna ligula, faucibus ac dapibus ut, scelerisque sit amet lectus.
                  </Typography>
                </CardContent>
              </Collapse>
            </Card>
              {/* <Paper className={classes.planItem}>
                <div onClick={() => setSelectedPlan(plan)} className={classes.planContent}>
                  <Typography variant="h6">{plan.records} records per month</Typography>
                  <Typography>{plan.cost} / month</Typography>
                </div>
              </Paper> */}
            </Grid>
          ))}
        </Grid>
        { selectedPlan && (selectedPlan.id === 'pro'
          ? <Paper style={{padding: 16, minHeight: 400, paddingBottom: 40}}>
              <RegionalOptions />
            </Paper>
          : <Grid container justify="center" spacing={3}>
              <Grid item md={6} xs={12}>
                <Card>
                  <CardContent>
                  <PaymentForm
                    planType={'national'} 
                    plan={selectedPlan}
                    onCancel={() => setSelectedPlan(null)}  
                  />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>) 
        }
      </Paper>
    </main>
  )
}
const mapStateToProps = (state) => {
  return { 
    plans: state.payment.plans
  }
}
const mapDispatch = (dispatch) => {
  return bindActionCreators({
    handleGetMetroStates
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatch)(RegistrationContainer)
