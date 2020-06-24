import { Grid } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { handleUpdateSelectedPlanType } from '../reducers/search';
import AntSwitch from './antSwitch';

const PlanTypeToggle = ({user, selectedPlanType, handleUpdateSelectedPlanType}) => {
    if (!user || !user.user_access) { return <div /> }
    const hasBoth = user.user_access.plans && user.user_access.plans.every(plan => plan.active)
    return (<div style={{width: '100%', margin: '4px auto', textAlign: 'center'}}>
                <Grid component="label" container justify="center" alignItems="center" spacing={1}>
                    <Grid style={{color: '#000'}} item>National</Grid>
                    <Grid item>
                        <AntSwitch
                            disabled={!hasBoth}
                            checked={selectedPlanType === 'regional'}
                            onChange={(event) => handleUpdateSelectedPlanType(event.target.checked ? 'regional' : 'national')}
                            value="planType"
                        />
                    </Grid>
                    <Grid style={{color: hasBoth ? '#000' : '#ccc'}} item>Regional</Grid>
                </Grid>
                <div><Link style={{color: 'blue'}} to={'/regional-upgrade'}>Upgrade Plan</Link></div>
            </div>)
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        selectedPlanType: state.search.selectedPlanType,
    }
  }
  const mapDispatch = (dispatch) => {
    return bindActionCreators({
        handleUpdateSelectedPlanType
    }, dispatch)
  }
  
export default withRouter(connect(mapStateToProps, mapDispatch)(PlanTypeToggle))
