import { Grid, InputAdornment, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import DateRangeComponent from './dateRangeComponent';
import MinMaxComponent from './minmaxComponent';
import withSearchHandler from './withSearchHandler';

const styles = theme => ({
    subheading: {
        marginBottom: theme.spacing(0.5)
    },
})

const SearchTaxDelinquents = ({ motivation, criteria, addCriteriaItem, classes }) => {
    return (
    <Grid container spacing={3}>
        <Grid item xs={12}>
            <Typography className={classes.subheading}>Years Delinquent</Typography>
            <MinMaxComponent
                criteria={criteria}
                section={motivation.id}
                name='years_delinquent'
                addCriteriaItem={addCriteriaItem}
            />
        </Grid>
        <Grid item xs={12}>
            <Typography className={classes.subheading}>Total Due</Typography>
            <MinMaxComponent
                criteria={criteria}
                section={motivation.id}
                name='total_due'
                InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    inputProps: { min: 0 }
                }}
                addCriteriaItem={addCriteriaItem}
            />
        </Grid>
        <Grid item xs={12}>
            <Typography className={classes.subheading}>Total Past Due</Typography>
            <MinMaxComponent
                criteria={criteria}
                section={motivation.id}
                name='total_past_due'
                InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    inputProps: { min: 0 }
                }}
                addCriteriaItem={addCriteriaItem}
            />
        </Grid>
        <Grid item xs={12}>
            <Typography className={classes.subheading}>Redemption Total</Typography>
            <MinMaxComponent
                criteria={criteria}
                section={motivation.id}
                name='redemption_total'
                InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    inputProps: { min: 0 }
                }}
                addCriteriaItem={addCriteriaItem}
            />
        </Grid>
        <Grid item xs={12}>
            <Typography className={classes.subheading}>Earliest Delinquent Date</Typography>
            <DateRangeComponent
                criteria={criteria}
                section={motivation.id}
                name='earliest_delinquent_date'
                addCriteriaItem={addCriteriaItem}
            />
        </Grid>
    </Grid>
    )
}

export default withStyles(styles)(withSearchHandler(SearchTaxDelinquents))
