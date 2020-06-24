import { Checkbox, FormControlLabel, Grid } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import withSearchHandler from './withSearchHandler';

const SearchOptions = ({ options, addCriteriaItem }) => {
    const handleChecked = (event) => {
        const name = event.target.name
        addCriteriaItem({section: 'options', group: name, data: {value: event.target.checked}})
    }
    return (
    <Grid container spacing={4} style={{padding: '0 20px'}}>
        {/* <Grid item xs={12}>
            <FormControlLabel
                control={
                <Checkbox
                    checked={options.skip_tracing ? options.skip_tracing.value || false : false}
                    onChange={handleChecked}
                    name="skip_tracing"
                    value="skip_tracing"
                    color="primary"
                />
                }
                label={<div>
                        <div>Include Premium Skip Tracing</div>
                        <div style={{fontSize: 12}}>(Additional $0.15 per record. 1000 record minimum. Billed separately)</div>
                    </div>}
            />
        </Grid> */}
        {/* <Grid item xs={12}>
            <FormControlLabel
                control={
                <Checkbox
                    checked={options.suppression ? options.suppression.value || false : false}
                    onChange={handleChecked}
                    name="suppression"
                    value="suppression"
                    color="primary"
                />
                }
                label="Include Suppression"
            />
        </Grid> */}
        <Grid item xs={12}>
            <FormControlLabel
                control={
                <Checkbox
                    checked={options.dedup_addresses ? options.dedup_addresses.value || false : false}
                    onChange={handleChecked}
                    name="dedup_addresses"
                    value="dedup_addresses"
                    color="primary"
                />
                }
                label="Remove Duplicate Mailing Addresses"
            />
        </Grid>
        <Grid item xs={12}>
            <FormControlLabel
                control={
                <Checkbox
                    checked={options.complete_property_address ? options.complete_property_address.value || false : false}
                    onChange={handleChecked}
                    name="complete_property_address"
                    value="complete_property_address"
                    color="primary"
                />
                }
                label="Complete Property Addresses"
            />
        </Grid>
        <Grid item xs={12}>
            <FormControlLabel
                control={
                <Checkbox
                    checked={options.complete_mailing_address ? options.complete_mailing_address.value || false : false}
                    onChange={handleChecked}
                    name="complete_mailing_address"
                    value="complete_mailing_address"
                    color="primary"
                />
                }
                label="Complete Mailing Addresses"
            />
        </Grid>
        {/* <Grid item xs={12}>
            <FormControlLabel
                control={
                <Checkbox
                    checked={options.randomize ? options.randomize.value || false : false}
                    onChange={handleChecked}
                    name="randomize"
                    value="randomize"
                    color="primary"
                />
                }
                label="Randomize Records"
            />
        </Grid> */}
    </Grid>
    )
}
const mapStateToProps = (state) => {
    return {
        options: state.search.criteria.options
    }
}

export default connect(mapStateToProps)(withSearchHandler(SearchOptions))
