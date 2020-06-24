import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DateRangeComponent from './dateRangeComponent';
import SearchListComponent from './searchListComponent';
import withSearchHandler from './withSearchHandler';

const SearchForeclosures = ({ motivation, criteria, addCriteriaItem }) => {
    const formatListOptions = () => {
        const items = [
            { name: 'pre-foreclosure', display_name: 'Pre-Foreclosure', enabled: true },
            { name: 'auction', display_name: 'Auction', enabled: true },
            { name: 'reo', display_name: 'REO', enabled: true },
        ]
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
            <Typography style={{marginBottom: '16px'}}>Foreclosure Dates</Typography>
            <DateRangeComponent
                criteria={criteria}
                section={motivation.id}
                name='foreclosure_dates'
                addCriteriaItem={addCriteriaItem}
            />
        </Grid>
        <Grid item xs={12}>
            <Typography style={{marginBottom: '16px'}}>Foreclosure Types</Typography>
            <SearchListComponent
                criteria={criteria}
                section={motivation.id}
                name='foreclosure_types'
                listItems={formatListOptions()}
                addCriteriaItem={addCriteriaItem}
            />
        </Grid>
    </Grid>
    )
}
const mapStateToProps = (state) => {
    return {
    }
}
const mapDispatch = (dispatch) => {
    return bindActionCreators({
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatch)(withSearchHandler(SearchForeclosures))
