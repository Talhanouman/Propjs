import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import DateSelectionComponent from './dateSelectionComponent';
import withSearchHandler from './withSearchHandler';

const SearchWaterShutoffs = ({ motivation, criteria, addCriteriaItem }) => {
    return (
    <Grid container spacing={3}>
        <Grid item xs={12}>
            <Typography style={{marginBottom: '16px'}}>Disconnect Date</Typography>
            <DateSelectionComponent
                criteria={criteria}
                section={motivation.id}
                name='disconnect_date'
                addCriteriaItem={addCriteriaItem}
            />
        </Grid>
    </Grid>
    )
}

export default withSearchHandler(SearchWaterShutoffs)
