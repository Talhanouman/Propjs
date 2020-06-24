import { FormControlLabel, Grid, Radio, RadioGroup, Typography } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import SearchCodeViolations from './searchCodeViolations';
import SearchForeclosures from './searchForeclosures';
import SearchTaxDelinquents from './searchTaxDelinquents';
import SearchVacants from './searchVacants';
import SearchWaterShutoffs from './searchWaterShutoffs';
import withSearchHandler from './withSearchHandler';

const SearchMotivationIndicators = ({ criteria, userAccess, selectedPlanType, addCriteriaItem }) => {
    const [ selectedMotivation, setSelectedMotivation ] = React.useState()
    // React.useEffect(() => {
    //     if (!indicatorType && criteria
    //         && (Object.keys(criteria.motivations).length > 0 ||
    //             Object.keys(criteria.cv).length > 0 ||
    //             Object.keys(criteria.taxd).length > 0)) {
    //         const val = Object.keys(criteria.motivations).length > 0 ? Object.keys(criteria.motivations)[0] :
    //                     Object.keys(criteria.cv).length > 0 ? 'cv' : 'taxd'
    //         setIndicator(val)
    //         // addCriteriaItem({section: 'motivations', group: val, data: { val: {} }})
    //     }
    // }, [criteria, addCriteriaItem, indicatorType]);
    const handleRadioChange = (event) => {
        const value = event.target.value
        const motivation = (userAccess.motivations || []).find(x => x.id === value)
        setSelectedMotivation(motivation)
        if (motivation.active) {
            addCriteriaItem({section: 'motivations', group: value, data: { value: {} }})
        }
    }
    const getComponent = () => {
        if (!selectedMotivation) { return <div /> }
        if (!selectedMotivation.active) { return <div><Typography variant='h5'>Requires upgrade</Typography></div>}
        switch (selectedMotivation.id) {
            case 'cv':
                return <SearchCodeViolations motivation={selectedMotivation} criteria={criteria} />
            case 'taxd':
                return <SearchTaxDelinquents motivation={selectedMotivation} criteria={criteria} />
            case 'foreclosures':
                return <SearchForeclosures motivation={selectedMotivation} criteria={criteria} />
            case 'vacants':
                return <SearchVacants motivation={selectedMotivation} criteria={criteria} />
            case 'ws':
                return <SearchWaterShutoffs motivation={selectedMotivation} criteria={criteria} />
            default:
                return <div />
        }
    }
    return (
    <Grid container spacing={3}>
        <Grid item xs={12}>
            <Grid container spacing={3} style={{marginTop: 24}}>
            <RadioGroup
                style={{ width: '100%'}}
                value={selectedMotivation ? selectedMotivation.id : ''}
                onChange={handleRadioChange} 
                row>
                    {(userAccess.motivations || []).filter(x => x.plan_type === selectedPlanType).map(item => (
                        <Grid key={item.id} item xs={4} style={{textAlign: 'center', margin: 'auto', justifyContent: 'center', alignItems: 'center'}}>
                            <FormControlLabel value={item.id} control={<Radio color="primary" />} label={item.label} style={{textTransform: 'capitalize'}} labelPlacement="top"  />
                        </Grid>
                    ))}
            </RadioGroup>
            </Grid>
            <div style={{marginTop: 16}}>
                {getComponent()}
            </div>
        </Grid>
    </Grid>
    )
}

const mapStateToProps = (state) => {
    return {
      criteria: state.search.criteria,
      selectedPlanType: state.search.selectedPlanType,
      userAccess: state.auth.user.userAccess
    }
}

export default connect(mapStateToProps)(withSearchHandler(SearchMotivationIndicators))
