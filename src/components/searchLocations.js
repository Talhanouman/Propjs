import { CircularProgress, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { handleGetStateDetail } from '../reducers/locations';
import { parser } from '../utils/parser';
import AutoSelect from './auto_select';
import StyledButton from './styledButton';
import withSearchHandler from './withSearchHandler';

const locationTypeOptions = [
    {value: 'counties', label: 'Search by Locality (County or Independent City)'},
    {value: 'cities', label: 'Search by City'},
    {value: 'zipcodes', label: 'Search by Zip'},
]
const SearchLocations = (props) => {
    const { states,
        stateDetail,
        getStateDetail,
        addCriteriaItem,
        isSearching,
        isLoading,
        selectedPlanType,
        criteria } = props
    // const classes = useStyles()
    const [ locationType, setLocationType ] = React.useState()
    const [ values, setValues ] = React.useState({})
    React.useEffect(() => {
        setLocationType(null);
        setValues({})
    }, [selectedPlanType]);
    const getSelected = () => {
        let selected = criteria.locations[locationType] ? JSON.parse(JSON.stringify(criteria.locations[locationType])) : []
        return selected.map(x => x.value)
    }
    const formatOptions = (data) => {
        if (!data) { data = {} }
        const selected = getSelected()
        var options = Object.keys(data).reduce((result, key) => {
            result.push({
                value: data[key].name,
                label: data[key].display_name,
                disabled: selected.indexOf(data[key].name) >= 0
            });
            return result;
        }, []);
        return options
    }
    const handleLocationTypeChange = (name) => item => {
        setLocationType(item.value);
        setValues({})
    }
    const handleChange = (name) => item => {
        setValues(oldValues => ({ ...oldValues, [name]: item }))
        if (item && name === 'states' && locationType !== 'states') {
            getStateDetail(item.value, selectedPlanType)
        }
    };
    const handleSubmit = () => {
        let oldValues = criteria.locations[locationType] || []
        oldValues.push(values[locationType])
        addCriteriaItem({section: 'locations', group: locationType, data: oldValues})
        setValues(oldValues => ({ ...oldValues, [locationType]: null }))
    }
    const formatSelectionTitle = (value) => {
        switch (value) {
            case 'counties':
                return 'Locality'
            case 'cities':
                return 'City'
            case 'zipcodes':
                return 'Zip'
            default:
                return value
        }
    }
    return (    
    <div>
        <div style={{width: '60%', minWidth: 400}}>
            <Typography variant="h6">List Builder</Typography>
            <AutoSelect
                textFieldProps={{
                    label: 'Select a Location Type',
                }}
                blockTyping={true}
                name='locationType'
                margin="none"
                options={locationTypeOptions}
                selectedValue={locationType ? locationTypeOptions.find(x => x.value === locationType) : ''}
                handleAutoSelectChange={handleLocationTypeChange}
            />
        </div>
        {locationType &&
        <React.Fragment>
            <Grid container spacing={4}>
                <Grid item sm={6} xs={12}>
                    <AutoSelect
                        textFieldProps={{
                            label: 'Select State',
                        }}
                        name='states'
                        margin="none"
                        disabled={isLoading}
                        options={formatOptions(states)}
                        selectedValue={values.states || []}
                        handleAutoSelectChange={handleChange}
                    />
                </Grid>
            </Grid>
            {locationType === 'states' &&
            <Grid container spacing={4}>
                <Grid item xs={3} style={{display: 'flex', justifyContent: 'start'}}>
                        <StyledButton
                            handleButtonClick={handleSubmit}
                            disabled={isSearching || !values.states || values.states.length === 0}
                        />
                    }
                </Grid>
            </Grid>
            }
            {locationType !== 'states' && values.states && values.states.value && stateDetail && !isLoading &&
                <Grid container spacing={4}>
                    <Grid item sm={6} xs={12}>
                        <AutoSelect
                            textFieldProps={{
                                label: 'Select ' + parser.capitalize(formatSelectionTitle(locationType)),
                            }}
                            name={locationType}
                            options={formatOptions(stateDetail[locationType])}
                            selectedValue={values[locationType] || []}
                            handleAutoSelectChange={handleChange}
                        /> 
                    </Grid>
                    <Grid item xs={3} style={{display: 'flex', justifyContent: 'start'}}>
                        <StyledButton
                            handleButtonClick={handleSubmit}
                            disabled={isSearching || !values[locationType] || values[locationType].length === 0}
                        />
                    </Grid>
                </Grid>
            }
            {isLoading && 
                <Grid item xs={12} style={{display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
                    <CircularProgress size={48} />
                </Grid>
            }
        </React.Fragment>}
    </div>
    )
}

const mapStateToProps = (state) => {
    return {
        selectedPlanType: state.search.selectedPlanType,
        states: state.locations.stateList,
        stateDetail: state.locations.stateDetail,
        isLoading: state.locations.isLoading
    }
}
const mapDispatch = (dispatch) => {
    return bindActionCreators({
        getStateDetail: handleGetStateDetail
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatch)((withSearchHandler(SearchLocations)))
