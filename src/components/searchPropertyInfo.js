import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { handleGetDeedTypes, handleGetUseCodes } from '../reducers/search';
import AutoSelect from './auto_select';
import DateRangeComponent from './dateRangeComponent';
import MinMaxComponent from './minmaxComponent';
import RadioComponent from './radioComponent';
import SearchListComponent from './searchListComponent';
import withSearchHandler from './withSearchHandler';

const useStyles = makeStyles(theme => ({
    textField: {
        marginTop: theme.spacing(1),
    },
    radioGroup: {
        marginBottom: 16,
        borderBottom: 'solid 1px #ccc'
    }
}))

const options = {
    trust: ['Trust', 'No Trust', 'No Preference'],
    corporate_owned: ['Corporate Owned', 'Not Corporate Owned', 'No Preference'],
    owner_type: ['Absentee', 'Owner Occupied', 'No Preference']
}
const propertyInfoOptions = [
    {type: "owner_type", value: "owner_type", label: "Owner Type"},
    {type: "list", value: "use_codes", label: "Use Codes"},
    {type: "list", value: "deed_types", label: "Deed Types"},
    {type: "minmax", value: "beds", label: "Bedrooms"},
    {type: "minmax", value: "baths", label: "Bathrooms"},
    {type: "minmax", value: "square_footage", label: "Square Footage"},
    {type: "minmax", value: "lot_size", label: "Lot Size"},
    {type: "minmax", value: "units", label: "Number of Units"},
    {type: "minmax", value: "year_built", label: "Year Built"},
    {type: "minmax", value: "market_value", label: "Market Value"},
    {type: "minmax", value: "assessed_value", label: "Assessed Value"},
    {type: "minmax", value: "ltv", label: "LTV"},
    {type: "minmax", value: "last_sale_price", label: "Last Market Sale Price"},
    {type: "daterange", value: "last_sale_date", label: "Last Market Sale Date"},
    {type: "minmax", value: "equity_money", label: "Equity $"},
    {type: "minmax", value: "equity_percentage", label: "Equity %"},
]
const SearchPropertyInfo = ({ criteria, use_codes, getUseCodes, deed_types, getDeedTypes, addCriteriaItem }) => {
    const classes = useStyles();
    const [ propertyType, setPropertyType ] = React.useState()
    const [ searchComponent, setSearchComponent ] = React.useState()
    React.useEffect(() => {
        getUseCodes()
        getDeedTypes()
    }, [getUseCodes, getDeedTypes])
    React.useEffect(() => {
        options.use_codes = use_codes
        options.deed_types = deed_types
    }, [use_codes, deed_types])
    const formatListOptions = (items) => {
        if (!items || items.length === 0) { return [] }
        return items.filter(x => x.enabled).map((item) => {
            return {
                value: item.name,
                label: item.display_name
            }
        })
    }
    const getComponent = (item) => {
        let dataType = item.type
        let value = item.value
        let dataOptions = options[value]
        switch (dataType) {
            case 'owner_type':
                return <div>
                    <div className={classes.radioGroup}>
                    <Typography variant="h6">Owner Type</Typography>
                    <RadioComponent
                        criteria={criteria}
                        section='property_info'
                        name={'owner_type'}
                        listItems={options.owner_type}
                        addCriteriaItem={addCriteriaItem}
                        />
                    </div>
                    <div className={classes.radioGroup}>
                    <Typography variant="h6">Corporate Owned</Typography>
                    <RadioComponent
                        criteria={criteria}
                        section='property_info'
                        name={'corporate_owned'}
                        listItems={options.corporate_owned}
                        addCriteriaItem={addCriteriaItem}
                        />
                    </div>
                    <div className={classes.radioGroup}>
                        <Typography variant="h6">Trust</Typography>
                        <RadioComponent
                            criteria={criteria}
                            section='property_info'
                            name={'trust'}
                            listItems={options.trust}
                            addCriteriaItem={addCriteriaItem}
                            />
                    </div>
                </div>
            case 'radio':
                return <RadioComponent
                        criteria={criteria}
                        section='property_info'
                        name={value}
                        listItems={dataOptions}
                        addCriteriaItem={addCriteriaItem}
                        />
            case 'minmax':
                return <MinMaxComponent
                        criteria={criteria}
                        section='property_info'
                        name={value}
                        addCriteriaItem={addCriteriaItem}
                        />
            case 'daterange':
                return  <DateRangeComponent
                        criteria={criteria}
                        section='property_info'
                        name={value}
                        addCriteriaItem={addCriteriaItem}
                        />
            case 'list':
                return <SearchListComponent
                        criteria={criteria}
                        section='property_info'
                        name={value}
                        listItems={formatListOptions(dataOptions)}
                        addCriteriaItem={addCriteriaItem}
                        />
            default:
                return <div />                 
        }
    }
    const handlePropertyTypeChange = (name) => item => {
        setSearchComponent(getComponent(item))
        setPropertyType(item.value)
    }
    return (
    <Grid container spacing={3}>
        <Grid item sm={8} xs={12}>
            <AutoSelect
                textFieldProps={{
                    label: 'Property Information Options',
                }}
                blockTyping={true}
                name='propertyType'
                margin="none"
                options={propertyInfoOptions}
                selectedValue={propertyType ? propertyInfoOptions.find(x => x.value === propertyType) : ''}
                handleAutoSelectChange={handlePropertyTypeChange}
            />
        </Grid>
        <Grid item xs={12}>
            {searchComponent}
        </Grid>
    </Grid>
    )
}

const mapStateToProps = (state) => {
    return {
        use_codes: state.search.useCodes,
        deed_types: state.search.deed_types,
        criteria: state.search.criteria,
    }
}
const mapDispatch = (dispatch) => {
    return bindActionCreators({
      getUseCodes: handleGetUseCodes,
      getDeedTypes: handleGetDeedTypes
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatch)(withSearchHandler(SearchPropertyInfo))
