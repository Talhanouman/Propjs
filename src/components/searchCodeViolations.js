import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { handleGetCaseTypes } from '../reducers/search';
import DateRangeComponent from './dateRangeComponent';
import SearchListComponent from './searchListComponent';
import withSearchHandler from './withSearchHandler';

const SearchCodeViolations = ({ motivation, criteria, case_types, getCaseTypes, addCriteriaItem }) => {
    React.useEffect(() => {
        getCaseTypes()
    }, [getCaseTypes])
    const formatListOptions = (items) => {
        if (!items || items.length === 0) { return [] }
        return items.filter(x => x.enabled).map((item) => {
            return {
                value: item.name,
                label: item.display_name
            }
        })
    }
    return (
    <Grid container spacing={3}>
        <Grid item xs={12}>
            <Typography style={{marginBottom: '16px'}}>Violation Dates</Typography>
            <DateRangeComponent
                criteria={criteria}
                section={motivation.id}
                name='violation_dates'
                addCriteriaItem={addCriteriaItem}
            />
        </Grid>
        <Grid item xs={12}>
            <Typography style={{marginBottom: '16px'}}>Case Types</Typography>
            <SearchListComponent
                criteria={criteria}
                section={motivation.id}
                name='case_types'
                listItems={formatListOptions(case_types)}
                addCriteriaItem={addCriteriaItem}
            />
        </Grid>
    </Grid>
    )
}
const mapStateToProps = (state) => {
    return {
        case_types: state.search.case_types
    }
}
const mapDispatch = (dispatch) => {
    return bindActionCreators({
      getCaseTypes: handleGetCaseTypes
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatch)(withSearchHandler(SearchCodeViolations))
